defmodule GuessTheLanguage.Game.UserLanguageChoice do
    use Ecto.Schema
    import Ecto.Changeset

    alias GuessTheLanguage.Game.LanguageChoice
    alias GuessTheLanguage.Accounts.User

    schema "user_language_choice" do
      field :uuid, Ecto.ShortUUID, autogenerate: true
      field :inserted_at, :utc_datetime
      belongs_to :user, User
      belongs_to :language_choice, LanguageChoice
    end

    def changeset(user_language_choice, params \\ %{}) do
      user_language_choice
      |> cast(params, [:inserted_at, :user_id, :language_choice_id])
      |> validate_required([:inserted_at, :user_id, :language_choice_id])
      |> foreign_key_constraint(:user_id)
      |> foreign_key_constraint(:language_choice_id)
      |> unique_constraint(:uuid)
    end
end