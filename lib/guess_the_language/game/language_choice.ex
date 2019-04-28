defmodule GuessTheLanguage.Game.LanguageChoice do
    use Ecto.Schema
    import Ecto.Changeset

    alias GuessTheLanguage.Game.Quiz
    alias GuessTheLanguage.Accounts.User
    alias GuessTheLanguage.Game.Language

    schema "language_choice" do
      field :uuid, Ecto.ShortUUID, autogenerate: true
      field :correct?, :boolean

      belongs_to :language, Language
      belongs_to :quiz, Quiz
      many_to_many :user, User, join_through: "user_language_choice"
    end

    def changeset(language_choice, params \\ %{}) do
      language_choice
      |> cast(params, [:correct?, :language_id, :quiz_id])
      |> validate_required([:correct?, :language_id, :quiz_id])
      |> foreign_key_constraint(:language_id)
      |> foreign_key_constraint(:quiz_id)
      |> unique_constraint(:no_repeated_languages_constraint, name: :language_choice_quiz_index)
    end
end