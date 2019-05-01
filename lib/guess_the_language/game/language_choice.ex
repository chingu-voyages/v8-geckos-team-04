defmodule GuessTheLanguage.Game.LanguageChoice do
    use Ecto.Schema
    import Ecto.Changeset

    alias GuessTheLanguage.Game
    alias GuessTheLanguage.Repo
    alias GuessTheLanguage.Accounts.User
    alias Game.{Language, Quiz, LanguageChoice}

    @derive {Jason.Encoder, only: [:uuid, :correct?, :language, :quiz]}
    schema "language_choice" do
      field :uuid, Ecto.ShortUUID, autogenerate: true
      field :correct?, :boolean, default: false

      belongs_to :language, Language
      belongs_to :quiz, Quiz
      many_to_many :user, User, join_through: "user_language_choice"
    end

    def valid_insert({:ok, language_choice}), do: language_choice

    def valid_insert({:error, changeset}) do
      %{"error" =>  Game.translate_error(changeset)}
    end

    def insert(params \\ %{}) do
      changeset(%LanguageChoice{}, params)
      |> Repo.insert
      |> valid_insert
    end

    defp valid_delete({:error, changeset}) do
      %{"error" =>  Game.translate_error(changeset)}
    end

    defp valid_delete({:ok, language_choice}) do
      language_choice
    end

    def delete(%{"uuid" => _uuid} = params) do
      case get_by_uuid(params) do
        %{"error" => errors} ->
           %{"error" => errors}
        language_choice -> 
            language_choice
            |> Repo.delete
            |> valid_delete
        end
      end
    
    defp valid_get(false) do
      %{"error" =>  "Unable to perform the operation on LanguageChoice as that uuid isn't valid"}
    end

    defp valid_get(nil) do
      %{"error" =>  "Unable to perform perform operation as a LanguageChoice with that uuid doesn't exist"}
    end

    defp valid_get(language_choice) do
      language_choice
    end

    #%{} -> %LanguageChoice{} || %{"error" =>..}
    def get_by_uuid(%{"uuid" => uuid} = params) do
      changeset = uuid_changeset(params)

      if changeset.valid? do
        Repo.get_by(LanguageChoice, uuid: uuid) |> valid_get
      else
        valid_get(false)
      end
    end

    defp valid_update({:error, changeset}) do
      %{"error" => Game.translate_error(changeset)}
    end

    defp valid_update({:ok, language_choice}) do
      language_choice
    end 

    def update(%{"uuid" => _uuid} = params) do
      case get_by_uuid(params) do
        %{"error" => errors} ->
           %{"error" => errors}
        language_choice -> 
            changeset = changeset(language_choice, params)
            if changeset.valid? do
            Repo.insert_or_update(changeset) |> valid_update
            end
        end
    end


    def uuid_changeset(params \\ %{}) do
      %LanguageChoice{}
      |> cast(params, [:uuid])
    end


    def changeset(language_choice, params \\ %{}) do
      language_choice
      |> cast(params, [:correct?, :language_id, :quiz_id])
      |> validate_required([:correct?, :language_id, :quiz_id])
      |> foreign_key_constraint(:language_id)
      |> foreign_key_constraint(:quiz_id)
      |> unique_constraint(:one_correct_answer_contraint, name: :correct_choice_quiz)
      |> unique_constraint(:no_repeated_languages_constraint, name: :language_choice_quiz_index)
      |> unique_constraint(:uuid)
    end
end