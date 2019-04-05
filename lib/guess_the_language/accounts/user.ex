defmodule GuessTheLanguage.Accounts.User do
    use Ecto.Schema

    alias GuessTheLanguage.Game.Video
    alias GuessTheLanguage.Game.Language
    @derive {Jason.Encoder, only: [:id]}
    schema "user" do
      field :uuid, Ecto.UUID, autogenerate: true
    end
end