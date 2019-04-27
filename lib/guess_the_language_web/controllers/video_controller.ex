defmodule GuessTheLanguageWeb.VideoController do
  use GuessTheLanguageWeb, :controller
  alias GuessTheLanguage.Game.{Screen, Video}
  alias GuessTheLanguage.Game
  alias GuessTheLanguage.Repo

  def preload_video(videos, assoc \\ [:youtube_video, :user, :source]) do
    Repo.preload(videos, assoc)
  end

  def index(conn, _params) do
    videos = Game.list_videos |> preload_video
    render(conn, "video_list.json", %{"videos" => videos})
  end

  def valid_video(%{"error" => message}, conn) do
    render(conn, "video.json", %{"error" => message})
  end

  def valid_video(%Video{} = video, conn) do
     video = preload_video(video)
     render(conn, "video.json", %{"new_video" => video})
  end

  def create(conn, params) do
    Game.create_video(params)
    |> valid_video(conn)
  end

  def show(conn, %{"uuid" => uuid}) do
    video = Game.get_video_by(uuid: uuid) |> preload_video
    render(conn, "video.json", %{"show_video" => video})
  end

  def delete(conn, %{"uuid" => uuid}) do
    video = Game.delete_video(uuid: uuid) |> preload_video
    render(conn, "video.json", %{"delete_video" => video})
  end

  def next(conn, _params) do
    videos = Game.next_videos |> preload_video
    render(conn, "video_list.json", %{"next_videos" => videos})
  end

  def create_page(conn, _params) do
    render(conn, "create.html")
  end
end
