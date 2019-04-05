defmodule GuessTheLanguage.Repo.Migrations.LanguageChoice do
  use Ecto.Migration

  def change do
    create table(:language_choice) do
    add :uuid, :uuid, null: false
    add :correctness, :boolean, null: false
    add :language_id, references(:language)
    add :multiple_language_quiz_id, references(:multiple_language_quiz)
    end
    create unique_index(:language_choice, [:language_id, :multiple_language_quiz_id])
  end
end
