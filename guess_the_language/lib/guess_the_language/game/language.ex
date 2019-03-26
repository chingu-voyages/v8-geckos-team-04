defmodule GuessTheLanguage.Game.Language do
    use Ecto.Schema
    import Ecto.Changeset

    alias GuessTheLanguage.Accounts.User
    alias GuessTheLanguage.Game.Video
    #alias GuessTheLanguage.Game.Area
    #alias GuessTheLanguage.Game.LanguageFamily

    schema "languages" do
      field :uuid, Ecto.UUID, autogenerate: true
      field :official, :boolean, default: false
      many_to_many :name, Language, join_through: "language_names"
      many_to_many :videos, Video, join_through: "language_videos"
      #has_many :descendants, Language
      #has_many :language_children, through: [:descendants, :parents]
      #many_to_many :scripts, Script
    end
end