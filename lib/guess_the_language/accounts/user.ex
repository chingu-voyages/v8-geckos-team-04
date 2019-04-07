defmodule GuessTheLanguage.Accounts.User do
    use Ecto.Schema

    alias GuessTheLanguage.Game.Video
    alias GuessTheLanguage.Game.{Language, LanguageChoice}
    @derive {Jason.Encoder, only: [:id]}

    schema "user" do
      field :uuid, Ecto.UUID, autogenerate: true
      many_to_many :language_choice, LanguageChoice, join_through: "user_language_choice"
    end
end