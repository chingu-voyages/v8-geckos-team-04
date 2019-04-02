defmodule GuessTheLanguage.Repo.Migrations.LanguageName do
  use Ecto.Migration

  def change do
    create table(:language_name) do
      add :name, :string, null: false
      add :written_language_id, references(:language)
      add :target_language_id, references(:language)
    end
  end
end