defmodule GuessTheLanguage.Game.Video do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query
  alias GuessTheLanguage.Game.{YoutubeVideo, Language, Video, Source, LanguageVideo}
  alias GuessTheLanguage.Accounts.User
  alias GuessTheLanguage.Repo
  
  @derive {Jason.Encoder, only: [:uuid, :duration, :source, :youtube_video, :language_video]}
  schema "video" do
    field :uuid, Ecto.ShortUUID, autogenerate: true
    field :duration, :integer, default: 0
    has_one :youtube_video, YoutubeVideo
    belongs_to :source, Source
    belongs_to :user, User
    many_to_many :language, Language, join_through: "language_video"
    has_many :language_video, LanguageVideo
  end

  def preload(video_list) when is_list(video_list) do
    video_list
    |> Enum.map(fn video -> preload(video) end)
  end

  def preload(%Video{} = video_struct) do
    video = Repo.one from video in Video,
    where: video.id == ^video_struct.id,
    left_join: language_video in assoc(video, :language_video),
    left_join: youtube_video in assoc(video, :youtube_video),
    left_join: source in assoc(video, :source),
    left_join: quiz in assoc(language_video, :quiz),
    left_join: language_choice in assoc(quiz, :language_choice),
    preload: [language_video: {language_video, quiz: {quiz, language_choice: {language_choice, :language}}},
     youtube_video: youtube_video, source: source]
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

  def delete(params) do
    video = Repo.get_by(Video, params)
    |> Repo.delete
    |> case do
        {:ok, video} -> video
        {:error, changeset} -> changeset.errors
      end
  end

  def changeset(video, params \\ %{}) do
      video
      |> cast(params, [:user_id, :duration, :source_id])
      |> validate_required([:user_id, :duration, :source_id])
      |> foreign_key_constraint(:user_id)
      |> unique_constraint(:uuid)
  end
end