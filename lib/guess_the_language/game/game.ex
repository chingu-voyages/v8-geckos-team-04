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

    def make_video(%{} = params) do
        {:ok, video} = Video.changeset(Map.put(params, "user_id", 1)) |> Repo.insert
        youtube_video = YoutubeVideo.changeset(Map.put(params, "video_id", video.id)) |> Repo.insert
        video
    end
end