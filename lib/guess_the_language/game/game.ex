defmodule GuessTheLanguage.Game do
    alias GuessTheLanguage.Repo

    alias GuessTheLanguage.Game.{Video, YoutubeVideo, YoutubeChannel, LanguageName, Language}

    #Returns the video with the id given
    def get_video(id) do
        Repo.get(Video, id)
    end
    #Returns a video based on the parameter given
    def get_video_by(params) do
        Repo.get_by(Video, params)
    end

    # Returns all videos in the database
    def list_videos do
        Repo.all(Video)
        |> Repo.preload([:youtube_video, :user])
    end

    #Returns a youtube video with the id given
    def get_youtube_video_by(id) do
        Repo.get(YoutubeVideo, id)
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
    def create_youtube_channel(%{"youtube_channel_uuid" => youtube_uuid,"youtube_channel_name" => name}) do

        YoutubeChannel.insert(%{"youtube_uuid" => youtube_uuid, "name" => name})
    end

    #Returns the wikitongues's YoutubeChannel
    def create_youtube_channel(%{}), do: get_youtube_channel(1)

    #%{"video_id", ...rest} -> %YoutubeVideo{}
    #with the map parameters produces a new youtube video structure with its related association (youtube_channel)
    def create_youtube_video(params) do
        youtube_channel = create_youtube_channel(params)
        Map.put(params, "youtube_channel_id", youtube_channel.id) 
        |> YoutubeVideo.insert_assoc
    end


    def create_language(params) do
        Language.insert(params)
    end

    #%{"title", ...rest} -> %Video{}
    #with the map parameters produces a new video structure with its related association (youtube_video)
    def create_video(%{} = params) do
        video = Video.insert(params)
        Map.put(params, "video_id", video.id) |> create_youtube_video
        video
    end
end