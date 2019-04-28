defmodule GuessTheLanguage.Game.Quiz do
    use Ecto.Schema
    import Ecto.Changeset

    alias GuessTheLanguage.Game.{Language, Quiz, LanguageVideo, LanguageChoice}
    alias GuessTheLanguage.Repo
    
    @derive {Jason.Encoder, only: [:uuid, :language, :language_video, :language_choice]}
    schema "quiz" do
      field :uuid, Ecto.ShortUUID, autogenerate: true
      many_to_many :language, Language, join_through: "language_choice"
      has_many :language_choice, LanguageChoice
      belongs_to :language_video, LanguageVideo
    end

    def valid_insert({:ok, quiz}), do: quiz

    def valid_insert({:error, changeset}) do
        translate_error(changeset)
    end

    def insert(params \\ %{}) do
      changeset(%Quiz{}, params)
      |> Repo.insert
      |> valid_insert
    end

    defp valid_delete({:error, changeset}) do
      %{"error" =>  translate_error(changeset)}
    end

    defp valid_delete({:ok, quiz}) do
      quiz
    end

    def delete(%{"uuid" => _uuid} = params) do
      case get_by_uuid(params) do
        %{"error" => errors} ->
           %{"error" => errors}
        quiz -> 
            quiz
            |> Repo.delete
            |> valid_delete
        end
      end
    
    defp valid_get(false) do
      %{"error" =>  "Unable to perform the operation on Quiz as that uuid isn't valid"}
    end

    defp valid_get(nil) do
      %{"error" =>  "Unable to perform perform operation as a Quiz with that uuid doesn't exist"}
    end

    defp valid_get(quiz) do
      quiz
    end

    #%{} -> %Quiz{} || %{"error" =>..} || nil
    def get_by_uuid(%{"uuid" => uuid} = params) do
      changeset = uuid_changeset(params)

      if changeset.valid? do
        Repo.get_by(Quiz, uuid: uuid) |> valid_get
      else
        valid_get(false)
      end
    end

    defp valid_update({:error, changeset}) do
      %{"error" => translate_error(changeset)}
    end

    defp valid_update({:ok, quiz}) do
      quiz
    end 

    def update(%{"uuid" => _uuid} = params) do
      case get_by_uuid(params) do
        %{"error" => errors} ->
           %{"error" => errors}
        quiz -> 
            changeset = changeset(quiz, params)
            if changeset.valid? do
            Repo.insert_or_update(changeset) |> valid_update
            end
        end
    end


    def uuid_changeset(params \\ %{}) do
      %Quiz{}
      |> cast(params, [:uuid])
    end

    def translate_error(changeset) do
     traverse_errors(changeset, fn {msg, opts} ->
      Enum.reduce(opts, msg, fn {key, value}, acc ->
        String.replace(acc, "%{#{key}}", to_string(value))
      end)
    end)

  end

    

    def changeset(quiz, params \\ %{}) do
      quiz
      |> cast(params, [:language_video_id])
      |> validate_required([:language_video_id])
      |> foreign_key_constraint(:language_video_id)
      |> unique_constraint(:uuid)
    end
  end