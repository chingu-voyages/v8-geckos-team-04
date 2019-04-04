defmodule GuessTheLanguage.Game.YoutubeChannel do
    use Ecto.Schema
    import Ecto.Changeset
    
    alias GuessTheLanguage.Game.YoutubeVideo
    
    schema "youtube_channel" do
      field :youtube_uuid, :string
      field :name, :string
      has_many :youtube_video, YoutubeVideo
      end

    def changeset(youtube_channel, params \\ %{}) do
        #add validation to truncate to seconds the datetime
        youtube_channel
        |> cast(params, [:youtube_uuid, :name])
        |> validate_required([:youtube_uuid, :name])
    end

end