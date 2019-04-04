defmodule GuessTheLanguageWeb.VideoView do
    use GuessTheLanguageWeb, :view

    def render("video_list.json", %{"videos" => videos}) do
    %{
        "videos" => videos
    }
    end
end