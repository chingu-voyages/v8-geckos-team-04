defmodule GuessTheLanguage.Repo.Migrations.User do
  use Ecto.Migration

  def change do
    create table(:user) do
      add :uuid, :uuid, null: false
    end
    create unique_index(:user, [:uuid])
    end 
end
