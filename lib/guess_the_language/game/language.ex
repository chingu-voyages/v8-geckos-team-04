defmodule GuessTheLanguage.Game.Language do
    use Ecto.Schema
    import Ecto.Changeset

    alias GuessTheLanguage.Game.{Language, LanguageName, Video, MultipleLanguageQuiz}
    alias GuessTheLanguage.Accounts.User
    alias GuessTheLanguage.Repo
    
    #alias GuessTheLanguage.Game.Area
    #alias GuessTheLanguage.Game.LanguageFamily

    schema "language" do
      field :uuid, Ecto.ShortUUID, autogenerate: true
      field :official, :boolean, default: true
      field :name, :string
      many_to_many :name, Language, join_through: "language_name"
      many_to_many :video, Video, join_through: "language_video"
      many_to_many :multiple_language_quiz, MultipleLanguageQuiz, join_through: "language_choice"
    end


    #Receives English as it is the default( written_id: 1)
    def insert_default(%{"written_id" => 1} = params) do
      params
     |> LanguageName.get_unique_name
     |> get_or_insert_language(params)
    end

    # Creates a new language with the receiving language name
    def get_or_insert_language([], params) do
      create_new_language(params)
    end

    #Returns the existing language with that language name
    def get_or_insert_language(language_name, params) do
      LanguageName.get_target(language_name)
    end

    def create_new_language(params) do
      IO.puts("inside create_new_language...")
      {:ok, language} = insert(params)
      language_name = LanguageName.insert_with_language(language, params)
      {language, language_name}
    end

    def insert(params \\ %{}) do
      changeset(%Language{}, params)
      |> Repo.insert
    end
    
    def changeset(language, params \\ %{}) do
      language
      |> cast(params, [:official])
      |> validate_required([:official])
      |> unique_constraint(:uuid)
    end
end