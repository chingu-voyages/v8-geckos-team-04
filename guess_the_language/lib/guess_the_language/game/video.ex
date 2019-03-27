defmodule GuessTheLanguage.Game.Video do
    use Ecto.Schema
    import Ecto.Changeset

    alias GuessTheLanguage.Game.YoutubeVideo
    alias GuessTheLanguage.Accounts.User
    alias GuessTheLanguage.Game.Language

    schema "video" do
      field :uuid, Ecto.UUID, autogenerate: true
      #field :duration, :int
      has_one :youtube_video, YoutubeVideo
      belongs_to :uploader, User
    end
end