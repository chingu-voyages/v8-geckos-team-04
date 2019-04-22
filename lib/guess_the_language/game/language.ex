defmodule GuessTheLanguage.Game.Language do
    use Ecto.Schema
    import Ecto.Changeset

    alias GuessTheLanguage.Game.{Language, Video, LanguageQuiz}
    alias GuessTheLanguage.Accounts.User
    alias GuessTheLanguage.Repo
    
    #alias GuessTheLanguage.Game.Area
    #alias GuessTheLanguage.Game.LanguageFamily

    schema "language" do
      field :uuid, Ecto.ShortUUID, autogenerate: true
      field :official, :boolean, default: true
      field :name, :string
      field :signed, :boolean,  default: false
      many_to_many :video, Video, join_through: "language_video"
      many_to_many :language_quiz, LanguageQuiz, join_through: "language_choice"
    end

    def valid_language({:ok, language}), do: language

    def valid_language({:error, changeset}) do
        case changeset.errors do
          [{:uuid, error_message}] -> error_message
          [{:name, error_message}] -> Repo.get_by(Language, name: changeset.changes.name)
          _ -> changeset.errors
        end
  
    end

    def insert(params \\ %{}) do
      changeset(%Language{}, params)
      |> Repo.insert
      |> valid_language
    end
    
    def changeset(language, params \\ %{}) do
      language
      |> cast(params, [:name, :official, :signed])
      |> validate_required([:name])
      |> unique_constraint(:name)
      |> unique_constraint(:uuid)
    end
end