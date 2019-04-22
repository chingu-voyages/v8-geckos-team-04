defmodule GuessTheLanguage.Repo.Migrations.Video do
  use Ecto.Migration

  def change do
    create table(:video) do
    add :uuid, :uuid, null: false
    add :duration, :integer, null: false
    add :source_id, references(:source), null: false
    add :user_id, references(:user), null: false
    end
    create unique_index(:video, [:uuid])
  end
end
