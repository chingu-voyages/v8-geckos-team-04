defmodule GuessTheLanguage.Game.Quiz do
    use Ecto.Schema
    import Ecto.Changeset

    alias GuessTheLanguage.Game.Language
    alias GuessTheLanguage.Game.LanguageVideo

    schema "quiz" do
      field :uuid, Ecto.ShortUUID, autogenerate: true
      many_to_many :language, Language, join_through: "language_choice"
      belongs_to :language_video, LanguageVideo
    end

    def changeset(quiz, params \\ %{}) do
      quiz
      |> cast(params, [:language_video_id])
      |> validate_required([:language_video_id])
      |> foreign_key_constraint(:language_video_id)
      |> unique_constraint(:uuid)
    end
  end