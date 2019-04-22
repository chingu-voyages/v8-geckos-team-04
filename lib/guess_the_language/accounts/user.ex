defmodule GuessTheLanguage.Accounts.User do
    use Ecto.Schema

    alias GuessTheLanguage.Game.{Language, LanguageChoice, Video}
    alias GuessTheLanguage.Accounts.User
    alias GuessTheLanguage.Repo

    @derive {Jason.Encoder, only: [:id]}

    schema "user" do
      field :uuid, Ecto.ShortUUID, autogenerate: true
      many_to_many :language_choice, LanguageChoice, join_through: "user_language_choice"

    end

    def insert(_params) do
       changeset |> Repo.insert
    end

    def changeset(params \\ %{}) do
      %User{}
    end
end