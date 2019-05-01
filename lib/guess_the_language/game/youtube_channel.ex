defmodule GuessTheLanguage.Game.YoutubeChannel do
    use Ecto.Schema
    import Ecto.Changeset
    
    alias GuessTheLanguage.Game.{YoutubeVideo, YoutubeChannel}
    alias GuessTheLanguage.Repo
    alias GuessTheLanguage.Game
    
    @derive {Jason.Encoder, only: [:youtube_uuid, :name]}
    schema "youtube_channel" do
      field :youtube_uuid, :string
      field :name, :string
      has_many :youtube_video, YoutubeVideo
      belongs_to :source, Source
      end

    def insert(params) do
      changeset(%YoutubeChannel{}, params)
      |> Repo.insert
      |> valid
    end

    def valid({:ok, youtube_channel}), do: youtube_channel

    def valid({:error, changeset}) do
        case changeset.errors do
          [{:source_id, error_message}] -> error_message
          [{:youtube_uuid, error_message}] -> Repo.get_by(YoutubeChannel, name: changeset.changes.name)
          _ -> changeset.errors
        end
  
    end

    def changeset(youtube_channel, params \\ %{}) do
        #add validation to truncate to seconds the datetime
        youtube_channel
        |> cast(params, [:youtube_uuid, :name, :source_id])
        |> validate_required([:youtube_uuid, :name, :source_id])
        |> unique_constraint(:youtube_uuid)
    end
end