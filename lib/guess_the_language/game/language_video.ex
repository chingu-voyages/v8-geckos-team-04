defmodule GuessTheLanguage.Game.LanguageVideo do
    use Ecto.Schema
    import Ecto.Changeset
    alias GuessTheLanguage.Repo
    alias GuessTheLanguage.Game.{Language, LanguageVideo, Video}

    @derive {Jason.Encoder, only: [:start_time, :end_time]}
    schema "language_video" do
        field :uuid, Ecto.ShortUUID, autogenerate: true
        field :start_time, :integer, default: 0
        field :end_time, :integer, default: 0
        belongs_to :video, Video
        belongs_to :language, Language
    end

    def insert(params) do
        changeset(%LanguageVideo{}, params)
        |> Repo.insert
    end

    def changeset(language_video, params \\ %{}) do
        language_video
        |> cast(params, [:video_id, :language_id, :start_time, :end_time])
        |> validate_required([:video_id, :language_id, :start_time, :end_time])
        |> foreign_key_constraint(:language_id)
        |> foreign_key_constraint(:video_id)
      end
end