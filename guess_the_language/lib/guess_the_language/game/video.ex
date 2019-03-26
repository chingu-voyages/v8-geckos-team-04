defmodule GuessTheLanguage.Game.Video do
    use Ecto.Schema
    import Ecto.Changeset

    alias GuessTheLanguage.Game.YoutubeVideo
    alias GuessTheLanguage.Accounts.User
    alias GuessTheLanguage.Game.Language

    schema "videos" do
      field :uuid, :uuid
      #field :duration, :int
      has_one :youtube_video, YoutubeVideo
      belongs_to :uploader, User
    end
end