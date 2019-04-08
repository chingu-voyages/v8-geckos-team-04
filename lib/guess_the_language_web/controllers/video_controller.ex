defmodule GuessTheLanguageWeb.VideoController do
  use GuessTheLanguageWeb, :controller
  alias GuessTheLanguage.Game.Screen
  alias GuessTheLanguage.Game
  alias GuessTheLanguage.Repo

  def index(conn, _params) do
    videos = Game.list_videos |> Repo.preload([:youtube_video, :user])
    render(conn, "video_list.json", %{"videos" => videos})
  end

  def create(conn, params) do
    video = Game.create_video(params) |> Repo.preload([:youtube_video, :user])
    render(conn, "video.json", %{"new_video" => video})
  end

  def create_page(conn, _params) do
    render(conn, "create.html")
  end
end
