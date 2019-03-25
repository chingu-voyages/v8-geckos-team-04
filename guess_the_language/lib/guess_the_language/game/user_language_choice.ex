defmodule GuessTheLanguage.Game.UserLanguageChoice do
    use Ecto.Schema
    import Ecto.Changeset

    alias GuessTheLanguage.Game.LanguageChoice
    alias GuessTheLanguage.Accounts.User

    schema "user_language_choice" do
      field :uuid, :uuid
      field :correct, :boolean

      belongs_to :users, User
      belongs_to :language_choice, LanguageChoice
      timestamp()
    end
end