defmodule GuessTheLanguageWeb.LanguageView do
    use GuessTheLanguageWeb, :view

    def render("language_list.json", %{"languages" => languages}) do
        %{"languages" => languages}
    end

    def render("language.json", %{"language" => language}) do
        %{"language" => language}
    end

    def render("language.json", %{"new_language" => language}) do
        %{"new_language" => language}
    end

    def render("language.json", %{"deleted_language" => language}) do
        %{"deleted_language" => language}
    end

    def render("language.json", %{"error" => message}) do
        %{"error" => message}
    end

end