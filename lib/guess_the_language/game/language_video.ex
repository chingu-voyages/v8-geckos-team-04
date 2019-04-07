defmodule GuessTheLanguage.Game.LanguageVideo do
    use Ecto.Schema

    alias GuessTheLanguage.Game.Video
    alias GuessTheLanguage.Game.Language

    schema "language_video" do
        belongs_to :video, Video
        belongs_to :language, Language
    end


    def changeset(language_video, params \\ %{}) do
        language_video
        |> cast(params, [])
        |> validate_required([])
      end
end