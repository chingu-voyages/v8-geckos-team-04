defmodule GuessTheLanguage.Repo.Migrations.LanguageName do
  use Ecto.Migration

  def change do
    create table(:language_name) do
      add :name, :string, null: false
      add :written_id, references(:language, on_delete: :delete_all), null: false
      add :target_id, references(:language, on_delete: :delete_all), null: false
    end
  end
end
