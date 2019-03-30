defmodule GuessTheLanguage.Game.YoutubeVideo do
    use Ecto.Schema
    import Ecto.Changeset

    alias GuessTheLanguage.Game.Video
    alias GuessTheLanguage.Game.YoutubeChannel
    @derive {Jason.Encoder, only: [:youtube_uuid, :title, :description, :published_at]}

    schema "youtube_video" do
      field :youtube_uuid, :string
      field :title, :string
      field :description, :string
      field :published_at, :utc_datetime

      belongs_to :youtube_channel, YoutubeChannel
      belongs_to :video, Video

    end
end