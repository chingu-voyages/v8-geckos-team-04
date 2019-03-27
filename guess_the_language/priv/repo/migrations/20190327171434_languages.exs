defmodule GuessTheLanguage.Repo.Migrations.Languages do
  use Ecto.Migration

  def change do
    create table(:languages) do
      add :uuid, :uuid, null: false
      add :official, :boolean, null: false
    end 
  end
end
