defmodule GuessTheLanguageWeb.VideoController do
  use GuessTheLanguageWeb, :controller
  alias GuessTheLanguage.Game.{Screen, Video}
  alias GuessTheLanguage.Game
  alias GuessTheLanguage.Repo

  def index(conn, _params) do
    videos = Game.list_videos |> Repo.preload([:youtube_video, :user, :source])
    render(conn, "video_list.json", %{"videos" => videos})
  end

  def create_render(%{"error" => message}, conn) do
    render(conn, "video.json", %{"error" => message})
  end

  def create_render(%Video{} = video, conn) do
     video = Repo.preload(video, [:youtube_video, :user, :source])
     render(conn, "video.json", %{"new_video" => video})
  end

  def create(conn, params) do
    Game.create_video(params)
    |> create_render(conn)
  end

  def create_page(conn, _params) do
    render(conn, "create.html")
  end
end
