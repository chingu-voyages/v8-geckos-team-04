defmodule GuessTheLanguageWeb.QuizView do
    use GuessTheLanguageWeb, :view

    def render("quiz_list.json", %{"quizs" => quizs} = params) do
    %{"quizs" => quizs}
    end

    def render("quiz.json", %{"new_quiz" => quiz}) do
        %{"new_quiz" => quiz}
    end

    def render("quiz.json", %{"show_quiz" => quiz}) do
        %{"quiz" => quiz}
    end

    def render("quiz.json", %{"delete_quiz" => quiz}) do
        %{"deleted_quiz" => quiz}
    end

    def render("quiz.json", %{"updated_quiz" => quiz}) do
        %{"updated_quiz" => quiz}
    end

    def render("quiz.json", %{"error" => message}) do
        %{"error" => message}
    end

end