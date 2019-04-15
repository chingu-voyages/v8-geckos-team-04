defmodule GuessTheLanguage.Game.Video do
  use Ecto.Schema
  import Ecto.Changeset
  alias GuessTheLanguage.Game.{YoutubeVideo, Language, Video}
  alias GuessTheLanguage.Accounts.User
  alias GuessTheLanguage.Repo
  
  @derive {Jason.Encoder, only: [:uuid, :youtube_video, :user, :duration, :source]}
  schema "video" do
    field :uuid, Ecto.ShortUUID, autogenerate: true
    field :duration, :integer
    field :source, :string
    has_many :youtube_video, YoutubeVideo
    belongs_to :user, User
    many_to_many :language, Language, join_through: "language_video"
  end


  #%{"user_id",...} -> %Video{} struct
  # produces a new video with the parameters including the user_id given
  def insert(%{"user_id" => user_id} = params) do
    {:ok, video} = changeset(%Video{}, params) |> Repo.insert
    video
  end

  # %{...} -> %Video{} struct
  # produces a new Video from the parameters and assigns user_id = 1.
  def insert(params) do
    params = Map.put(params, "user_id", 1)
    {:ok, video} = changeset(%Video{}, params) |> Repo.insert
    video
  end

  def changeset(video, params \\ %{}) do
      video
      |> cast(params, [:user_id, :duration, :source])
      |> validate_required([:user_id, :duration, :source])
      |> foreign_key_constraint(:user_id)
      |> unique_constraint(:uuid)
  end
end