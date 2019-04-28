defmodule GuessTheLanguage.Game.Language do
    use Ecto.Schema
    import Ecto.Changeset

    alias GuessTheLanguage.Game.{Language, Video, Quiz}
    alias GuessTheLanguage.Accounts.User
    alias GuessTheLanguage.Repo
    
    #alias GuessTheLanguage.Game.Area
    #alias GuessTheLanguage.Game.LanguageFamily

    @derive {Jason.Encoder, only: [:uuid, :name]}
    schema "language" do
      field :uuid, Ecto.ShortUUID, autogenerate: true
      field :official?, :boolean, default: true
      field :name, :string
      field :signed?, :boolean,  default: false
      many_to_many :video, Video, join_through: "language_video"
      many_to_many :quiz, Quiz, join_through: "language_choice"
    end

    def valid_insert({:ok, language}), do: language

    def valid_insert({:error, changeset}) do
        case changeset.errors do
          [{:name, error_message}] -> Repo.get_by(Language, name: changeset.changes.name)
          _ -> %{"error" => translate_error(changeset)}
        end
    end

    def insert(params \\ %{}) do
      changeset(%Language{}, params)
      |> Repo.insert
      |> valid_insert
    end

    defp valid_delete({:error, changeset}) do
      %{"error" =>  translate_error(changeset)}
    end

    defp valid_delete({:ok, language}) do
      language
    end

    def delete(%{"uuid" => _uuid} = params) do
      case get_by_uuid(params) do
        %{"error" => errors} ->
           %{"error" => errors}
        language -> 
            language
            |> Repo.delete
            |> valid_delete
        end
      end
    
    defp valid_get(false) do
      %{"error" =>  "Unable to perform the operation on Language as that uuid isn't valid"}
    end

    defp valid_get(nil) do
      %{"error" =>  "Unable to perform perform operation as a Language with that uuid doesn't exist"}
    end

    defp valid_get(language) do
      language
    end

    #%{} -> %Language{} || %{"error" =>..} || nil
    def get_by_uuid(%{"uuid" => uuid} = params) do
      changeset = uuid_changeset(params)

      if changeset.valid? do
        Repo.get_by(Language, uuid: uuid) |> valid_get
      else
        valid_get(false)
      end
    end

    defp valid_update({:error, changeset}) do
      %{"error" => translate_error(changeset)}
    end

    defp valid_update({:ok, language}) do
      language
    end 

    def update(%{"uuid" => _uuid} = params) do
      case get_by_uuid(params) do
        %{"error" => errors} ->
           %{"error" => errors}
        language -> 
            changeset = changeset(language, params)
            if changeset.valid? do
            Repo.insert_or_update(changeset) |> valid_update
            end
        end
    end


    def uuid_changeset(params \\ %{}) do
      %Language{}
      |> cast(params, [:uuid])
    end

    def translate_error(changeset) do
     traverse_errors(changeset, fn {msg, opts} ->
      Enum.reduce(opts, msg, fn {key, value}, acc ->
        String.replace(acc, "%{#{key}}", to_string(value))
      end)
    end)

  end
    
    def changeset(language, params \\ %{}) do
      language
      |> cast(params, [:name, :official, :signed, :uuid])
      |> validate_required([:name])
      |> unique_constraint(:name)
      |> unique_constraint(:uuid)
    end
end