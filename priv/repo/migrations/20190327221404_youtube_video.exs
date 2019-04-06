defmodule GuessTheLanguage.Repo.Migrations.YoutubeVideo do
  use Ecto.Migration

  def change do
    create table(:youtube_video) do
      add :youtube_uuid, :string, null: false
      add :title, :string, null: false
      add :description, :text, null: false
      add :published_at, :utc_datetime, null: false
      add :youtube_channel_id, references(:youtube_channel, on_delete: :delete_all), null: false
      add :video_id, references(:video, on_delete: :delete_all), null: false
    end
    create unique_index(:youtube_video, [:youtube_uuid])
  end
end
