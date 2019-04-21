defmodule GuessTheLanguage.Game.LanguageName do
    use Ecto.Schema
    import Ecto.Changeset
    import Ecto.Query

    alias GuessTheLanguage.Game.{Language, LanguageName}
    alias GuessTheLanguage.Repo

    schema "language_name" do
      field :name, :string
      belongs_to :target, Language
      belongs_to :written, Language

    end


    def insert_default(params) do
      params
      |> unique_name_query
      |> get_or_insert(params)
    end

    # Integer -> LanguageName struct
    # Return [] if the languageName doesn't exist and 
    # Checks if there's already a language with that name

    def get_unique_name(params) do
      case unique_name_query(params) do
        [] -> []
        [language_name | tail] -> language_name
      end
    end

    #English as default
    def insert_with_language(language, params) do
      params = Map.put(params, "target_id", language.id)
      {:ok, language_name} = changeset(%LanguageName{}, params) |> Repo.insert
      language_name
    end


    def unique_name_query(%{"name" => name} = params) do
      query = (from l in LanguageName, where: l.name == ^name, select: l)
      |> Repo.all
    end

    def get_target(language_name) do
      Repo.get(LanguageName, language_name.id)
    end

    def completely_unique(%{"name" => name, "target_id" => target_id, "written_id" => written_id}) do
      query = from(l in LanguageName,
      where: l.name == ^name and l.target_id == ^target_id and l.written_id == ^written_id,
      select: l)
      |> Repo.all
    end

    defp get_or_insert([], params), do: changeset(%LanguageName{}, params) |> Repo.insert

    defp get_or_insert([language_name], _params), do: language_name

    def insert(params) do
      params
      |> completely_unique
      |> get_or_insert(params)
    end
    
      def changeset(language_name, params \\ %{}) do
        language_name
        |> cast(params, [:name, :target_id, :written_id])
        |> validate_required([:name, :target_id, :written_id])
        |> foreign_key_constraint(:target_id)
        |> foreign_key_constraint(:written_id)
      end
end