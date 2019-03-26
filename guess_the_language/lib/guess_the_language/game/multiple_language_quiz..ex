defmodule GuessTheLanguage.Game.MultipleLanguageQuiz do
    use Ecto.Schema
    import Ecto.Changeset

    alias GuessTheLanguage.Game.Language
    alias GuessTheLanguage.Game.VideoLanguage

    schema "multiple_language_quiz" do
      many_to_many :languages, Language, join_through: "language_choice"
      belongs_to :video_language, VideoLanguage

    end
end