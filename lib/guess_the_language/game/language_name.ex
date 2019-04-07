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

    def check_existence(%{"name" => name, "target_id" => target_id, "written_id" => written_id}) do
      query = from(l in LanguageName,
      where: l.name == ^name and l.target_id == ^target_id and l.written_id == ^written_id,
      select: l)
      |> Repo.all
    end

    defp get_or_insert([], params), do: changeset(%LanguageName{}, params) |> Repo.insert

    defp get_or_insert([language_name], _params), do: language_name

    def insert(params) do
      params
      |> check_existence
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