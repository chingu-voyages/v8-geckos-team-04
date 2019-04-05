defmodule GuessTheLanguage.Repo.Migrations.MultipleLanguageQuiz do
  use Ecto.Migration

  def change do
    create table(:multiple_language_quiz) do
      add :language_video_id, references(:language_video)
    end
  end
end
