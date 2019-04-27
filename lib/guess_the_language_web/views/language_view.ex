defmodule GuessTheLanguageWeb.LanguageView do
    use GuessTheLanguageWeb, :view

    def render("language_list.json", %{"languages" => languages}) do
        languages
    end

    def render("language.json", %{"language" => language}) do
        language
    end

end