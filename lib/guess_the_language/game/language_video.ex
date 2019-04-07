defmodule GuessTheLanguage.Game.LanguageVideo do
    use Ecto.Schema
    import Ecto.Changeset

    alias GuessTheLanguage.Game.Video
    alias GuessTheLanguage.Game.Language

    schema "language_video" do
        belongs_to :video, Video
        belongs_to :language, Language
    end

    def changeset(language_video, params \\ %{}) do
        language_video
        |> cast(params, [:video_id, :language_id])
        |> validate_required([:video_id, :language_id])
        |> foreign_key_constraint(:language_id)
        |> foreign_key_constraint(:video_id)
      end
end