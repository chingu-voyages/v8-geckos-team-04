defmodule GuessTheLanguage.Game.LanguageChoice do
    use Ecto.Schema
    import Ecto.Changeset

    alias GuessTheLanguage.Game.MultipleLanguageQuiz
    alias GuessTheLanguage.Accounts.User
    alias GuessTheLanguage.Game.Language

    schema "language_choice" do
      field :uuid, Ecto.ShortUUID, autogenerate: true
      field :correctness, :boolean

      belongs_to :language, Language
      belongs_to :multiple_language_quiz, MultipleLanguageQuiz
      many_to_many :user, User, join_through: "user_language_choice"
    end

    def changeset(language_choice, params \\ %{}) do
      language_choice
      |> cast(params, [:correctness, :language_id, :multiple_language_quiz_id])
      |> validate_required([:correctness, :language_id, :multiple_language_quiz_id])
      |> foreign_key_constraint(:language_id)
      |> foreign_key_constraint(:multiple_language_quiz_id)
      |> unique_constraint(:no_repeated_languages_constraint, name: :language_choice_multiple_language_quiz_index)
    end
end