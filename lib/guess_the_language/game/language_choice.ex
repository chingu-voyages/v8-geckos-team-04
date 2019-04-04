defmodule GuessTheLanguage.Game.LanguageChoice do
    use Ecto.Schema
    import Ecto.Changeset

    alias GuessTheLanguage.Game.MultipleLanguageQuiz
    alias GuessTheLanguage.Accounts.User
    alias GuessTheLanguage.Game.Language

    schema "language_choice" do
      field :uuid, Ecto.UUID, autogenerate: true
      field :correctness, :boolean

      belongs_to :language, Language
      belongs_to :multiple_language_quiz, MultipleLanguageQuiz
      many_to_many :user, User, join_through: "user_language_choice"
    end
end