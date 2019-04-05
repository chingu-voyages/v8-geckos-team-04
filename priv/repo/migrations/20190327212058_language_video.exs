defmodule GuessTheLanguage.Repo.Migrations.WatchedVideo do
  use Ecto.Migration

  def change do
    create table(:language_video) do
      add :video_id, references(:video)
      add :language_id, references(:language)
      end
  end
end
