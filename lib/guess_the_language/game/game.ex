defmodule GuessTheLanguage.Game do
    alias GuessTheLanguage.Repo

    alias GuessTheLanguage.Game.{Video, YoutubeVideo, YoutubeChannel}
  
    def get_video(id) do
        Repo.get(Video, id)
    end

    def get_video_by(params) do
        Repo.get_by(Video, params)
    end

    def list_videos do
        Repo.all(Video)
        |> Repo.preload([:youtube_video, :user])
    end


    def get_youtube_video_by(id) do
        Repo.get(YoutubeVideo, id)
    end


    def get_youtube_channel(id) do
        Repo.get(YoutubeChannel, id)
    end

    def get_youtube_channel_by(params) do
        Repo.get_by(YoutubeChannel, params)
    end


    def preload_youtube_video(youtube_video), do: youtube_video |> Repo.preload([:video, :youtube_channel])

    def list_youtube_videos do
        Repo.all(YoutubeVideo)
    end

   def list_channels do
        Repo.all(YoutubeChannel)
        |> Repo.preload([:youtube_video])
   end

    def add_video_id(youtube_video, video_id) do
        %{youtube_video | video_id: video_id}
    end

    def create_youtube_video(
        %{
        "youtube_uuid" => youtube_uuid,
        "title" => title,
        "description" => description,
        "published_at" => time,
        "youtube_channel_uuid" => youtube_channel_uuid,
        "youtube_channel_name" => youtube_channel_name} = params) do
        
        youtube_channel = YoutubeChannel.insert(params.youtube_channel_name, params.youtube_channel_uuid)
        %{%YoutubeVideo{} |
         youtube_uuid: youtube_uuid, title: title, description: description, published_at: time, youtube_channel_id: youtube_channel.id}
    end

    def create_youtube_video(%{"youtube_uuid" => video_uuid, "title" => title, "description" => description, "published_at" => time}) do
        %{%YoutubeVideo{} | youtube_uuid: video_uuid, title: title, description: description, published_at: time, youtube_channel_id: 1}
    end

    def create_video(%{} = params) do
        {:ok, video} = Video.changeset(%Video{}, %{"user_id" =>  1}) |> Repo.insert
        create_youtube_video(params)
        |> preload_youtube_video
        |> add_video_id(video.id)
        |> YoutubeVideo.get_or_insert_video
        video
        |> Repo.preload([:youtube_video, :user])

    end
end