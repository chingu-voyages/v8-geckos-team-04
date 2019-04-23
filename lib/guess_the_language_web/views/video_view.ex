defmodule GuessTheLanguageWeb.VideoView do
    use GuessTheLanguageWeb, :view

    def render("video_list.json", %{"videos" => videos} = params) do
    %{"videos" => videos}
    end

    def render("video.json", %{"new_video" => video}) do
        %{"video" => video}
    end

    def render("video.json", %{"error" => message}) do
        %{"error" => message}
    end

    def render("video.json", %{"show_video" => video}) do
        %{"video" => video}
    end

    def render("video.json", %{"delete_video" => video}) do
        %{"delete_video" => video}
    end

end