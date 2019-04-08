defmodule GuessTheLanguageWeb.VideoView do
    use GuessTheLanguageWeb, :view

    def render("video_list.json", %{"videos" => videos} = params) do
    %{"videos" => videos}
    end

    def render("video.json", %{"new_video" => video}) do
        %{"video" => video}
    end

end