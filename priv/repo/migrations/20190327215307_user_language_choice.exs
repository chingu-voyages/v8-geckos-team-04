defmodule GuessTheLanguage.Repo.Migrations.UserLanguageChoice do
  use Ecto.Migration

  def change do
    create table(:user_language_choice) do
      add :uuid, :uuid, null: false
      add :inserted_at, :utc_datetime, null: false
      add :user_id, references(:user, on_delete: :delete_all), null: false
      add :language_choice, references(:language_choice, on_delete: :delete_all), null: false
    end
  end
end
