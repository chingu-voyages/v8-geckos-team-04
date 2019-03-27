defmodule GuessTheLanguage.Repo.Migrations.YoutubeChannel do
  use Ecto.Migration

  def change do
    create table(:youtube_channel) do
      add :youtube_id, :string, null: false
      add :name, :string, null: false
      
    end
  end
end
