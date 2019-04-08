defmodule GuessTheLanguage.Game.Language do
    use Ecto.Schema
    import Ecto.Changeset

    alias GuessTheLanguage.Game.{Language, Video, MultipleLanguageQuiz}
    alias GuessTheLanguage.Accounts.User
    
    #alias GuessTheLanguage.Game.Area
    #alias GuessTheLanguage.Game.LanguageFamily

    schema "language" do
      field :uuid, Ecto.ShortUUID, autogenerate: true
      field :official, :boolean, default: true
      many_to_many :name, Language, join_through: "language_name"
      many_to_many :video, Video, join_through: "language_video"
      many_to_many :multiple_language_quiz, MultipleLanguageQuiz, join_through: "language_choice"
    end
    
    def changeset(language, params \\ %{}) do
      language
      |> cast(params, [:official])
      |> validate_required([:official])
    end
end