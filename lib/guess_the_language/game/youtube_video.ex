defmodule GuessTheLanguage.Game.YoutubeVideo do
  use Ecto.Schema
  import Ecto.Changeset
  alias GuessTheLanguage.{Game, Repo}
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

  def insert_assoc(%{} = params) do
    %YoutubeVideo{}
    |> changeset_assoc(params)
    |> Repo.insert
    |> valid_video
  end

  def insert(%{} = params) do
    %YoutubeVideo{}
    |> changeset(params)
    |> Repo.insert
    |> valid_video
  end

  def valid_video({:ok, youtube_video}), do: youtube_video

  def valid_video({:error, changeset}) do
    case changeset.errors do
      [{:youtube_uuid, a}] -> Repo.get_by(YoutubeVideo, youtube_uuid: changeset.changes.youtube_uuid)
      [{:youtube_channel_id, w}] -> w
      [{:video_id, w}] -> w
    end
  end

  def changeset(youtube_video, params \\ %{}) do
      youtube_video
      |> cast(params, [:youtube_uuid, :title, :description, :published_at])
      |> validate_required([:youtube_uuid, :title, :description, :published_at])
      |> unique_constraint(:youtube_uuid)
  end

  def changeset_assoc(youtube_video, params \\ %{}) do
    youtube_video
    |> cast(params, [:youtube_uuid, :title, :description, :published_at, :youtube_channel_id, :video_id])
    |> validate_required([:youtube_uuid, :title, :description, :published_at, :youtube_channel_id, :video_id])
    |> foreign_key_constraint(:youtube_channel_id)
    |> foreign_key_constraint(:video_id)
    |> unique_constraint(:youtube_uuid)
end
end