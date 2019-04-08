defmodule GuessTheLanguage.Repo.Migrations.MultipleLanguageQuiz do
  use Ecto.Migration

  def change do
    create table(:multiple_language_quiz) do
      add :uuid, :uuid, null: false
      add :language_video_id, references(:language_video, on_delete: :delete_all), null: false
    end
    create unique_index(:multiple_language_quiz, [:uuid])
  end
end
