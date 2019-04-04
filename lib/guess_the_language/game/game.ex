defmodule GuessTheLanguage.Game do
    alias GuessTheLanguage.Repo

    alias GuessTheLanguage.Game.{Video, YoutubeVideo}

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

    def get_youtube_video_by(params) do
        Repo.get_by(YoutubeVideo, params)
    end

    def create_video(%YoutubeVideo{} = youtube_video) do
        youtube_video = youtube_video |> Repo.preload([:video, :youtube_channel])
        {:ok, video} = Video.changeset(%Video{}, %{"user_id" =>  1}) |> Repo.insert
        youtube_video = %{youtube_video | video_id: video.id, youtube_channel_id: 1}
        {:ok, youtube_video} = YoutubeVideo.changeset(youtube_video, %{"video_id" => video.id, "youtube_channel_id" => 1}) |> Repo.insert
        {video, youtube_video}
    end
end