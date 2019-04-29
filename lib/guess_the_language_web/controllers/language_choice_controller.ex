defmodule GuessTheLanguageWeb.LanguageChoiceController do
    use GuessTheLanguageWeb, :controller
    alias GuessTheLanguage.Game
    alias Game.{Quiz, Language, LanguageChoice}
    alias GuessTheLanguage.Repo



    def preload_language_choice(language_choice, assoc \\ [:quiz, :language]) do
        Repo.preload(language_choice, assoc)
    end

    def send_error(conn, resp) do
        render(conn, "language_choice.json", resp)
    end

    def create_page(conn, _params) do
        render(conn, "create.html")
    end


    def index(conn, params) do
        language_choices = Game.list_language_choices |> preload_language_choice
        render(conn, "language_choice_list.json", %{"language_choices" => language_choices})
    end


    def show(conn, %{"uuid" => uuid} = params) do
        Game.get_language_choice_by_uuid(params)
        |> show_valid(conn)
    end

    def show_valid(%{"error" => error} = resp, conn) do
        send_error(conn, resp)
    end

    def show_valid(%LanguageChoice{} = language_choice, conn) do
        language_choice = language_choice |> preload_language_choice
        render(conn, "language_choice.json", %{"show_language_choice" => language_choice})
    end


    def create(conn, params) do
        Game.create_language_choice(params)
        |> create_valid(conn)
    end

    def create_valid(%{"error" => message} = resp, conn) do
        send_error(conn, resp)
    end

    def create_valid(%LanguageChoice{} = language_choice, conn) do
        language_choice = language_choice |> preload_language_choice
        render(conn, "language_choice.json", %{"new_language_choice" => language_choice})
    end



    def delete(conn, params) do
        Game.delete_language_choice(params) |> delete_valid(conn)
    end

    def delete_valid(%{"error" => message} = resp, conn) do
        send_error(conn, resp)
    end

    def delete_valid(%LanguageChoice{} = language_choice, conn) do
        language_choice = language_choice |> preload_language_choice
        render(conn, "language_choice.json", %{"deleted_language_choice" => language_choice})
    end


    def update(conn, %{"uuid" => uuid}= params) do
        Game.update_language_choice(params) |> update_valid(conn)
    end

    def update_valid(%{"error" => message} = resp, conn) do
        send_error(conn, resp)
    end

    def update_valid(%LanguageChoice{} = language_choice, conn) do
        language_choice = language_choice |> preload_language_choice
        render(conn, "language_choice.json", %{"updated_language_choice" => language_choice})
    end

end