defmodule GuessTheLanguage.Repo.Migrations.DropChoiceIndex do
  use Ecto.Migration

  def change do
    drop index("language_choice", [:correct?, :quiz_id], name: :correct_choice_quiz)
  end
end
