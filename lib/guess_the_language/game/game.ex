defmodule GuessTheLanguage.Game do
    alias GuessTheLanguage.Repo
    import Ecto.Query, only: [from: 2]
    alias GuessTheLanguage.Game.{Video, YoutubeVideo, YoutubeChannel,
     Language, LanguageVideo, LanguageChoice, LanguageQuiz, Source}

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

    #Queries

    # List of video IDs -> List of videos
    # Produces a list of 3 random videos from the list of videos' ids
    def next_videos do
        distinct_language_videos
        |> Repo.all
        |> Enum.take_random(3)
        |> Enum.map(fn id -> get_video(id) end)
    end

    #From LanguageVideo table returns videos' id with distinct languages
    def distinct_language_videos do
        from(lv in LanguageVideo,
        distinct: lv.language_id, select: lv.video_id)
    end

end