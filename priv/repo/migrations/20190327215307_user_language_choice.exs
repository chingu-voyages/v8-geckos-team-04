defmodule GuessTheLanguage.Repo.Migrations.UserLanguageChoice do
  use Ecto.Migration

  def change do
    create table(:user_language_choice) do
      add :uuid, :uuid, null: false
      add :inserted_at, :utc_datetime, null: false
      add :user_id, references(:user)
      add :language_choice, references(:language_choice)
    end
  end
end
