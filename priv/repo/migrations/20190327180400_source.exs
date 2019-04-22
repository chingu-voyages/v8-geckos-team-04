defmodule GuessTheLanguage.Repo.Migrations.AddSourceTable do
  use Ecto.Migration

  def change do
    create table(:source) do
      add :uuid, :uuid, null: false
      add :name, :string, null: false
      add :website, :string, null: false
    end
    create unique_index(:source, [:website])
    create unique_index(:source, [:uuid])
  end
end
