defmodule GuessTheLanguage.Game.YoutubeChannel do
    use Ecto.Schema
    import Ecto.Changeset
    
    alias GuessTheLanguage.Game.{YoutubeVideo, YoutubeChannel}
    alias GuessTheLanguage.Repo
    
    schema "youtube_channel" do
      field :youtube_uuid, :string
      field :name, :string
      has_many :youtube_video, YoutubeVideo
      end

    def insert(params) do
      changeset(%YoutubeChannel{}, params)
      |> get_or_insert
    end

    defp get_or_insert(youtube_channel) do
      youtube_channel
      |> Repo.insert
      |> case do
      {:ok, youtube_channel} -> youtube_channel
      {:error, changeset} -> Repo.get_by(YoutubeChannel, youtube_uuid: changeset.changes.youtube_uuid)
      end
    end

    def changeset(youtube_channel, params \\ %{}) do
        #add validation to truncate to seconds the datetime
        youtube_channel
        |> cast(params, [:youtube_uuid, :name])
        |> validate_required([:youtube_uuid, :name])
        |> unique_constraint(:youtube_uuid)
    end

end