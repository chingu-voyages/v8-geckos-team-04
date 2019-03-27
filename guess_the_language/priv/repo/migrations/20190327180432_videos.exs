defmodule GuessTheLanguage.Repo.Migrations.Videos do
  use Ecto.Migration

  def change do
    add :uuid, :uuid, null: false
    add :user_id, references(:users)
  end
end
