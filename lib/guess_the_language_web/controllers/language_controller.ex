defmodule GuessTheLanguageWeb.LanguageController do
    use GuessTheLanguageWeb, :controller
    alias GuessTheLanguage.Game.Language
    alias GuessTheLanguage.Game
    alias GuessTheLanguage.Repo

    def preload_language(languages, assoc \\ []) do
        Repo.preload(languages, assoc)
    end

    def send_error(conn, resp) do
        render(conn, "language.json", resp)
    end


    def index(conn, params) do
        languages = Game.list_languages
        render(conn, "language_list.json", %{"languages" => languages})
    end


    def show(conn, %{"uuid" => uuid} = params) do
        Game.get_language_by_uuid(params)
        |> show_valid(conn)
    end

    def show_valid(%{"error" => error} = resp, _type, conn) do
        send_error(conn, resp)
    end

    def show_valid(%Language{} = language, conn) do
        render(conn, "language.json", %{"language" => language})
    end



    def create(conn, params) do
       Game.create_language(params)
       |> create_valid(conn)
    end

    def create_valid(%{"error" => message} = resp, conn) do
        send_error(conn, resp)
    end

    def create_valid(%Language{} = language, conn) do
        render(conn, "language.json", %{"new_language" => language})
    end



    def delete(conn, params) do
        Game.delete_video(params) |> delete_valid(conn)
    end

    def delete_valid(%{"error" => message} = resp, conn) do
        send_error(conn, resp)
    end

    def delete_valid(%Language{} = language, conn) do
        render(conn, "language.json", %{"deleted_language" => language})
    end


    def update(conn, %{"uuid" => uuid}= params) do
        Game.update_language(params) |> update_valid(conn)
    end

    def update_valid(%{"error" => message} = resp, conn) do
        send_error(conn, resp)
    end

    def update_valid(%Language{} = language, conn) do
        render(conn, "language.json", %{"updated_language" => language})
    end

    def update_page(conn, _params) do
        render(conn, "update.html")
      end

end