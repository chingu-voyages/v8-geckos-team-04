defmodule GuessTheLanguage.Repo.Migrations.LanguageQuiz do
  use Ecto.Migration

  def change do
    create table(:language_quiz) do
      add :uuid, :uuid, null: false
      add :language_video_id, references(:language_video, on_delete: :delete_all), null: false
    end
    create unique_index(:language_quiz, [:uuid])
  end
end
