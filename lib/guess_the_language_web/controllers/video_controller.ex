defmodule GuessTheLanguageWeb.VideoController do
  use GuessTheLanguageWeb, :controller
  alias GuessTheLanguage.Game.Screen
  alias GuessTheLanguage.Game
  alias GuessTheLanguage.Repo

  def index(conn, _params) do
    videos = Screen.list_videos() |> Repo.preload([:youtube_video, :user])
    render(conn, "video_list.json", %{"videos" => videos})
  end

  def create(conn, params) do
    Game.create_video(params)
    |> Repo.preload([:youtube_video, :user])
  end
end
