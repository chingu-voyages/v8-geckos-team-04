defmodule GuessTheLanguageWeb.LanguageVideoView do
    use GuessTheLanguageWeb, :view

    def render("language_video_list.json", %{"language_videos" => language_videos} = params) do
    %{"language_videos" => language_videos}
    end

    def render("language_video.json", %{"new_language_video" => language_video}) do
        %{"new_language_video" => language_video}
    end

    def render("language_video.json", %{"show_language_video" => language_video}) do
        %{"language_video" => language_video}
    end

    def render("language_video.json", %{"delete_language_video" => language_video}) do
        %{"deleted_language_video" => language_video}
    end

    def render("language_video.json", %{"updated_language_video" => language_video}) do
        %{"updated_language_video" => language_video}
    end

    def render("language_video.json", %{"error" => message}) do
        %{"error" => message}
    end

end