defmodule GuessTheLanguage.Repo.Migrations.Video do
  use Ecto.Migration

  def change do
    create table(:video) do
    add :uuid, :uuid, null: false
    add :duration, :integer, null: false
    add :source, :string
    add :user_id, references(:user), null: false
    add :youtube_video_id, references(:youtube_video)
    
    end
    create unique_index(:video, [:uuid])
  end
end
