defmodule GuessTheLanguage.Game.MultipleLanguageQuiz do
    use Ecto.Schema
    import Ecto.Changeset

    alias GuessTheLanguage.Game.Language
    alias GuessTheLanguage.Game.WatchedVideo

    schema "multiple_language_quiz" do
      many_to_many :language, Language, join_through: "language_choice"
      belongs_to :watched_video, WatchedVideo

    end
end