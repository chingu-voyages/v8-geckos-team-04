defmodule GuessTheLanguageWeb.VideoController do
  use GuessTheLanguageWeb, :controller
  alias GuessTheLanguage.Game.Screen
  alias GuessTheLanguage.Game
  alias GuessTheLanguage.Repo

  def index(conn, _params) do
    videos = Game.list_videos |> Repo.preload([:youtube_video])
    render(conn, "video_list.json", %{"videos" => videos})
  end

  def create(conn, params) do
    video = Game.create_video(params) |> Repo.preload([:youtube_video])
    render(conn, "video.json", %{"new_video" => video})
  end
end
