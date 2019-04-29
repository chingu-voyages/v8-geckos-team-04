defmodule GuessTheLanguage.Repo.Migrations.LanguageVideo do
  use Ecto.Migration

  def change do
    create table(:language_video) do
      add :uuid, :uuid, null: false
      add :start_time, :integer, null: false
      add :end_time, :integer, null: false
      add :video_id, references(:video, on_delete: :delete_all), null: false
      add :language_id, references(:language, on_delete: :delete_all), null: false
      end
  end
end
