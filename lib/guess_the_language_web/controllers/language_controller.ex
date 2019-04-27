defmodule GuessTheLanguageWeb.LanguageController do
    use GuessTheLanguageWeb, :controller
    alias GuessTheLanguage.Game.Language
    alias GuessTheLanguage.Game
    alias GuessTheLanguage.Repo

    def index(conn, params) do
        languages = Game.list_languages
        render(conn, "language_list.json", %{"languages" => languages})
    end

    def show(conn, %{"uuid" => uuid} = params) do
        language = Game.get_language_by(uuid: uuid)
        render(conn, "language.json", %{"language" => language})
    end

    def create(conn, params) do
        render(conn, "language.json")
    end

    def delete(conn, params) do
        render(conn, "language.json")
    end

end