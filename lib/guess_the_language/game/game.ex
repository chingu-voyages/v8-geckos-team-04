defmodule GuessTheLanguage.Game do
    alias GuessTheLanguage.Repo
    import Ecto.Query, only: [from: 2]
    import Ecto.Changeset, only: [traverse_errors: 2]
    alias GuessTheLanguage.Game.{Video, YoutubeVideo, YoutubeChannel,
     Language, LanguageVideo, LanguageChoice, Quiz, Source}

    def list_language_videos do
        Repo.all(LanguageVideo)
    end

    def get_language_video_by_uuid(params) do
        LanguageVideo.get_by_uuid(params)
    end

    def create_language_video(params) do
        LanguageVideo.insert(params)
    end

    def delete_language_video(params) do
        LanguageVideo.delete(params)
    end

    def update_language_video(params) do
        LanguageVideo.update(params)
    end
    
     def list_quizzes do
        Repo.all(Quiz)
    end
    
    def get_quiz_by_uuid(params) do
        Quiz.get_by_uuid(params)
    end

    def create_quiz(params) do
        Quiz.insert(params)
    end

    def delete_quiz(params) do
        Quiz.delete(params)
    end

    def update_quiz(params) do
        Quiz.update(params)
    end

    def list_language_choices do
        Repo.all(LanguageChoice)
    end

    def get_language_choice_by_uuid(params) do
        LanguageChoice.get_by_uuid(params)
    end

    def create_language_choice(params) do
        LanguageChoice.insert(params)
    end

    def delete_language_choice(params) do
        LanguageChoice.delete(params)
    end

    def update_language_choice(params) do
        LanguageChoice.update(params)
    end

    #Returns the video with the id given
    def get_video(id) do
        Repo.get(Video, id)
    end
    #Returns a video based on the parameter given
    def get_video_by(params) do
        Repo.get_by(Video, params)
    end

    # -> ListOfVideos
    # Returns all videos in the database
    def list_videos do
        Repo.all(Video)
        |> Repo.preload([:youtube_video, :user])
    end

    # -> ListOfLanguages
    # Returns all languages
    def list_languages do
        Repo.all(Language)
    end

    #Returns the language with the id given
    def get_language(id) do
        Repo.get(Language, id)
    end

    def get_language_by_uuid(params) do
        Language.get_by_uuid(params)
    end

    # %{"param" => ""} -> %Language{}
    # Get a language with the param given
    def get_language_by(params) do
        Repo.get_by(Language, params)
    end

    #Returns a youtube video with the id given
    def get_youtube_video_by(id) do
        Repo.get(YoutubeVideo, id)
    end

    #Returns a source with the id given
    def get_source_by(id) do
        Repo.get(Source, id)
    end

    #Returns a youtube channel with the id given
    def get_youtube_channel(id) do
        Repo.get(YoutubeChannel, id)
    end

    #Returns a youtube channel based on the parameter given
    def get_youtube_channel_by(params) do
        Repo.get_by(YoutubeChannel, params)
    end

    #Returns all youtube videos in the database
    def list_youtube_videos do
        Repo.all(YoutubeVideo)
    end

    #Returns all youtube channels in the database
   def list_youtube_channels do
        Repo.all(YoutubeChannel)
        |> Repo.preload([:youtube_video])
   end

    #Creates a new youtube channel based on the parameters given
    def create_youtube_channel(%{"youtube_channel_uuid" => youtube_uuid,"youtube_channel_name" => name} = params) do
        params = Map.put(params, "youtube_uuid", youtube_uuid)
        params = Map.put(params, "name", name)
        YoutubeChannel.insert(params)
    end

    #Returns the wikitongues's YoutubeChannel
    def create_youtube_channel(%{}), do: get_youtube_channel(1)

    #%{"video_id", ...rest} -> %YoutubeVideo{}
    #with the map parameters produces a new youtube video structure with its related association (youtube_channel)
    def create_youtube_video(params) do
        youtube_channel = create_youtube_channel(params)
        params = Map.put_new(params, "youtube_channel_id", youtube_channel.id) 
        YoutubeVideo.insert_assoc(params)
    end


    def create_language(params) do
        params = Map.put_new(params, "name", params["language_name"])
        Language.insert(params)
    end

    def create_language_video(params) do
        LanguageVideo.insert(params)
    end

    def create_source(%{"source_name" => source_name, "source_website" => source_website} = params) do
        params = Map.put_new(params, "name", params["source_name"])
        params = Map.put_new(params, "website", params["source_website"])
        Source.insert(params)
    end

    def create_source(%{} = params) do
        get_source_by(1)
    end

    #%{"title", ...rest} -> %Video{}
    #with the map parameters produces a new video with its related associations (youtube_video)
    def create_video(%{} = params) do
        case YoutubeVideo.already_inserted(params) do
        %YoutubeVideo{} -> video_in_database
        nil ->
        source = create_source(params)
        params = Map.put(params, "source_id", source.id) 
        video = Video.insert(params)
        language = create_language(params)
        params = Map.put(params, "video_id", video.id) |> Map.put("language_id", language.id)
        youtube_video = create_youtube_video(params)
        language_video = create_language_video(params)  
        video
        end
    end

    def video_in_database do
        %{"error" => "A video with this same youtube uuid is already in our database"}
    end

    def delete_video(params) do
        Video.delete(params)
    end

    def delete_language(params) do
        Language.delete(params)
    end

    def update_language(params) do
        Language.update(params)
    end

    #Queries

    # List of video IDs -> List of videos
    # Produces a list of 3 random videos from a list of videos' ids
    def next_videos do
        distinct_language_videos
        |> Enum.take_random(10)
        |> Enum.map(fn id -> get_video(id) end)
    end

    #From LanguageVideo table returns videos' id with distinct languages
    def distinct_language_videos do
        from(lv in LanguageVideo, distinct: lv.language_id, select: lv.video_id)
        |> Repo.all
    end

    def create_quiz(%{} = params) do
        Quiz.insert(params)
    end

    def create_correct_language_choice(%{"quiz_id" => _, "language_id" => _} = params) do
        params = Map.put(params, "correct?", true)
        LanguageChoice.insert(params)
    end

    def choice_from_id(id, quiz_id) do
        LanguageChoice.insert(%{"language_id" => id, "quiz_id" => quiz_id})
    end

    def create_random_language_choice(%{"quiz_id" => quiz_id, "language_id" => language_id} = params) do
        correct_language_query = from l in Language, where: l.id == ^language_id, select: l.id
        all_except = from l in Language, select: l.id, except: ^correct_language_query
        language_choices = Repo.all(all_except)
        |> Enum.take_random(2)
        |> Enum.map(fn id -> choice_from_id(id, quiz_id) end)
    end

     
    def create_language_choices(language_video) do
        #If there's already a quiz return that otherwise create a new one
        #with three language choices
        case Quiz.created_before?(language_video) do
            [quiz] -> quiz
            [] -> 
        quiz = create_quiz(%{"language_video_id" => language_video.id})
        params = %{"quiz_id" => quiz.id, "language_id" => language_video.language_id}
        create_correct_language_choice(params)
        create_random_language_choice(params)
        quiz
        end
    end

    def manage_language_choices do
        Repo.all(LanguageVideo)
        |> Enum.map(fn language_video -> create_language_choices(language_video) end)
    end

    def translate_error(changeset) do
     traverse_errors(changeset, fn {msg, opts} ->
      Enum.reduce(opts, msg, fn {key, value}, acc ->
        String.replace(acc, "%{#{key}}", to_string(value)) end)
        end)
    end
end