defmodule GuessTheLanguage.Repo.Migrations.UpdateLanguageChoice do
  use Ecto.Migration

  def change do
    alter table(:language_choice) do
      add :multiple_language_quiz_id, references(:multiple_language_quiz)
    end
  end
end
