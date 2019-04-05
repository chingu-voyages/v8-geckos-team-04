defmodule GuessTheLanguage.Repo.Migrations.RenameWatchedVideos_Table do
  use Ecto.Migration

  def change do
    rename table(:watched_video), to: table(:language_video)
  end
end
