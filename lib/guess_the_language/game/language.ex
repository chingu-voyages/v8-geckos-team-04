defmodule GuessTheLanguage.Game.Language do
    use Ecto.Schema
    import Ecto.Changeset

    alias GuessTheLanguage.Game.Language
    alias GuessTheLanguage.Accounts.User
    alias GuessTheLanguage.Game.Video
    #alias GuessTheLanguage.Game.Area
    #alias GuessTheLanguage.Game.LanguageFamily

    schema "language" do
      field :uuid, Ecto.UUID, autogenerate: true
      field :official, :boolean, default: false
      many_to_many :name, Language, join_through: "language_name"
      many_to_many :video, Video, join_through: "watched_video"
    end
end