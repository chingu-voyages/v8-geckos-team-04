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
    
    #alternative method
    #youtube_video = build_assoc(video, :youtube_video, %{})
    def make_video(%YoutubeVideo{} = youtube_video) do
        {:ok, video} = Video.changeset(%Video{}, %{user_id: 1}) |> Repo.insert
        youtube_video = YoutubeVideo.changeset(youtube_video, %{video_id: video.id}) |> Repo.insert
        video
    end
end