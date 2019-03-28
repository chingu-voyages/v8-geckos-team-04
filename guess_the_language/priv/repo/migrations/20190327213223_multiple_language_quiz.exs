defmodule GuessTheLanguage.Repo.Migrations.MultipleLanguageQuiz do
  use Ecto.Migration

  def change do
    create table(:multiple_language_quiz) do
      add :watched_video_id, references(:watched_video)
    end
  end
end
