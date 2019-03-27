defmodule GuessTheLanguage.Game.UserLanguageChoice do
    use Ecto.Schema
    import Ecto.Changeset

    alias GuessTheLanguage.Game.LanguageChoice
    alias GuessTheLanguage.Accounts.User

    schema "user_language_choice" do
      field :uuid, Ecto.UUID, autogenerate: true
      field :inserted_at, :utc_datetime
      belongs_to :user, User
      belongs_to :language_choice, LanguageChoice
    end
end