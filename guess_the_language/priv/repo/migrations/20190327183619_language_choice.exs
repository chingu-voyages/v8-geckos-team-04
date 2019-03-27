defmodule GuessTheLanguage.Repo.Migrations.LanguageChoice do
  use Ecto.Migration

  def change do
    create table(:language_choice) do
    add :uuid, :uuid, null: false
    add :correctness, :boolean, null: false
    add :language_id, references(:language)
    end
  end
end
