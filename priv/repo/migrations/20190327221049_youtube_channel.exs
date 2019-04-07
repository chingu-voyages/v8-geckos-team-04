defmodule GuessTheLanguage.Repo.Migrations.YoutubeChannel do
  use Ecto.Migration

  def change do
    create table(:youtube_channel) do
      add :youtube_uuid, :string, null: false
      add :name, :string, null: false
    end
    create unique_index(:youtube_channel, [:youtube_uuid])
  end
end
