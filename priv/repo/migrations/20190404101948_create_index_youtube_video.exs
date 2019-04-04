defmodule GuessTheLanguage.Repo.Migrations.CreateIndexYoutubeVideo do
  use Ecto.Migration

  def change do
    create unique_index(:youtube_video, [:youtube_uuid])
  end
end
