defmodule GuessTheLanguage.Repo.Migrations.LanguageChoice do
  use Ecto.Migration

  def change do
    create table(:language_choice) do
    add :uuid, :uuid, null: false
    add :correct?, :boolean, null: false
    add :language_id, references(:language, on_delete: :delete_all), null: false
    add :quiz_id, references(:quiz, on_delete: :delete_all), null: false
    end

    create unique_index(:language_choice, [:language_id, :quiz_id],
     name: :language_choice_quiz_index)
     create unique_index(:language_choice, [:correct?, :quiz_id],
     name: :correct_choice_quiz)
    create unique_index(:language_choice, [:uuid])
  end
end
