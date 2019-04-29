defmodule GuessTheLanguageWeb.LanguageChoiceView do
    use GuessTheLanguageWeb, :view

    def render("language_choice_list.json", %{"language_choices" => language_choices} = params) do
    %{"language_choices" => language_choices}
    end

    def render("language_choice.json", %{"new_language_choice" => language_choice}) do
        %{"new_language_choice" => language_choice}
    end

    def render("language_choice.json", %{"show_language_choice" => language_choice}) do
        %{"language_choice" => language_choice}
    end

    def render("language_choice.json", %{"delete_language_choice" => language_choice}) do
        %{"deleted_language_choice" => language_choice}
    end

    def render("language_choice.json", %{"updated_language_choice" => language_choice}) do
        %{"updated_language_choice" => language_choice}
    end

    def render("language_choice.json", %{"error" => message}) do
        %{"error" => message}
    end

end