defmodule GuessTheLanguage.Game.LanguageName do
    use Ecto.Schema
    import Ecto.Changeset

    alias GuessTheLanguage.Game.Language

    schema "language_names" do
      field :name, :string
      belongs_to :target, Language
      belongs_to :written, Language

    end
end