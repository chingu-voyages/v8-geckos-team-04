defmodule GuessTheLanguage.Game.YoutubeVideo do
    use Ecto.Schema
    import Ecto.Changeset

    alias GuessTheLanguage.Game.{Video, YoutubeChannel, YoutubeVideo}
    @derive {Jason.Encoder, only: [:youtube_uuid, :title, :description, :published_at]}

    schema "youtube_video" do
      field :youtube_uuid, :string
      field :title, :string
      field :description, :string
      field :published_at, :utc_datetime

      belongs_to :youtube_channel, YoutubeChannel
      belongs_to :video, Video

    end

    def changeset(youtube_video, params \\ %{}) do
        #add validation to truncate to seconds the datetime
        youtube_video
        |> cast(params, [:youtube_uuid, :title, :description, :published_at])
        |> validate_required([:youtube_uuid, :title, :description, :published_at])
    end
end