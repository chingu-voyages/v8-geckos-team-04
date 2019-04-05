defmodule GuessTheLanguage.Repo.Migrations.IndexYoutubeChannel do
  use Ecto.Migration

  def change do
    create unique_index(:youtube_channel, [:youtube_uuid])
  end
end
