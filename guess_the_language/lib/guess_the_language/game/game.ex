defmodule GuessTheLanguage.Game do
    alias GuessTheLanguage.Repo

    alias GuessTheLanguage.Game.Video

    def get_video(id) do
        Repo.get(Video, id)
    end

    def get_video_by(params) do
        Repo.get_by(Video, params)
    end

    def list_videos do
        Repo.all(Video)
        |> Repo.preload(:youtube_video)
    end
end