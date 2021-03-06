defmodule GuessTheLanguageWeb.QuizController do
    use GuessTheLanguageWeb, :controller
    alias GuessTheLanguage.Game.{Quiz, Language, LanguageChoice}
    alias GuessTheLanguage.Game
    alias GuessTheLanguage.Repo



    def preload_quiz(quiz, assoc \\ [:language_video, {:language_choice, :language}]) do
        Repo.preload(quiz, assoc)
    end

    def send_error(conn, resp) do
        render(conn, "quiz.json", resp)
    end


    def index(conn, params) do
        quizzes = Game.list_quizzes |> preload_quiz
        render(conn, "quiz_list.json", %{"quizzes" => quizzes})
    end


    def show(conn, %{"uuid" => uuid} = params) do
        Game.get_quiz_by_uuid(params)
        |> show_valid(conn)
    end

    def show_valid(%{"error" => error} = resp, conn) do
        send_error(conn, resp)
    end

    def show_valid(%Quiz{} = quiz, conn) do
        quiz = quiz |> preload_quiz
        render(conn, "quiz.json", %{"show_quiz" => quiz})
    end


    def create(conn, params) do
        Game.create_quiz(params)
        |> create_valid(conn)
    end

    def create_valid(%{"error" => message} = resp, conn) do
        send_error(conn, resp)
    end

    def create_valid(%Quiz{} = quiz, conn) do
        quiz = quiz |> preload_quiz
        render(conn, "quiz.json", %{"new_quiz" => quiz})
    end



    def delete(conn, params) do
        Game.delete_quiz(params) |> delete_valid(conn)
    end

    def delete_valid(%{"error" => message} = resp, conn) do
        send_error(conn, resp)
    end

    def delete_valid(%Quiz{} = quiz, conn) do
        quiz = quiz |> preload_quiz
        render(conn, "quiz.json", %{"deleted_quiz" => quiz})
    end


    def update(conn, %{"uuid" => uuid}= params) do
        Game.update_quiz(params) |> update_valid(conn)
    end

    def update_valid(%{"error" => message} = resp, conn) do
        send_error(conn, resp)
    end

    def update_valid(%Quiz{} = quiz, conn) do
        quiz = quiz |> preload_quiz
        render(conn, "quiz.json", %{"updated_quiz" => quiz})
    end

end