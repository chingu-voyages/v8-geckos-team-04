defmodule GuessTheLanguage.Repo.Migrations.Language do
  use Ecto.Migration

  def change do
    create table(:language) do
      add :uuid, :uuid, null: false
      add :official, :boolean, null: false
    end
    create unique_index(:language, [:uuid])
  end
end
