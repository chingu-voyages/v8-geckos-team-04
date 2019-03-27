defmodule GuessTheLanguageWeb.VideoController do
  use GuessTheLanguageWeb, :controller
  alias GuessTheLanguage.Game.Screen

  def index(conn, _params) do
    videos = Screen.list_videos()
    render(conn, "video_list.json", %{"videos" => videos})
  end
end
