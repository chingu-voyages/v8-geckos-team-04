defmodule GuessTheLanguageWeb.LanguageVideoController do
    use GuessTheLanguageWeb, :controller
    alias GuessTheLanguage.Game
    alias Game.{Quiz, Language, LanguageVideo}
    alias GuessTheLanguage.Repo


    def preload_language_video(language_video, assoc \\ [:quiz]) do

        Repo.preload(language_video, assoc)
    end

    def send_error(conn, resp) do
        render(conn, "language_video.json", resp)
    end

    def create_page(conn, _params) do
        render(conn, "create.html")
    end


    def index(conn, params) do
        language_videos = Game.list_language_videos |> preload_language_video
        render(conn, "language_video_list.json", %{"language_videos" => language_videos})
    end


    def show(conn, %{"uuid" => uuid} = params) do
        Game.get_language_video_by_uuid(params)
        |> show_valid(conn)
    end

    def show_valid(%{"error" => error} = resp, conn) do
        send_error(conn, resp)
    end

    def show_valid(%LanguageVideo{} = language_video, conn) do
        language_video = language_video |> preload_language_video
        render(conn, "language_video.json", %{"show_language_video" => language_video})
    end


    def create(conn, params) do
        Game.create_language_video(params)
        |> create_valid(conn)
    end

    def create_valid(%{"error" => message} = resp, conn) do
        send_error(conn, resp)
    end

    def create_valid(%LanguageVideo{} = language_video, conn) do
        language_video = language_video |> preload_language_video
        render(conn, "language_video.json", %{"new_language_video" => language_video})
    end



    def delete(conn, params) do
        Game.delete_language_video(params) |> delete_valid(conn)
    end

    def delete_valid(%{"error" => message} = resp, conn) do
        send_error(conn, resp)
    end

    def delete_valid(%LanguageVideo{} = language_video, conn) do
        language_video = language_video |> preload_language_video
        render(conn, "language_video.json", %{"deleted_language_video" => language_video})
    end


    def update(conn, %{"uuid" => uuid}= params) do
        Game.update_language_video(params) |> update_valid(conn)
    end

    def update_valid(%{"error" => message} = resp, conn) do
        send_error(conn, resp)
    end

    def update_valid(%LanguageVideo{} = language_video, conn) do
        language_video = language_video |> preload_language_video
        render(conn, "language_video.json", %{"updated_language_video" => language_video})
    end

end