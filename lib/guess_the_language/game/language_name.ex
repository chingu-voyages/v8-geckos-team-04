defmodule GuessTheLanguage.Game.LanguageName do
    use Ecto.Schema
    import Ecto.Changeset

    alias GuessTheLanguage.Game.Language

    schema "language_name" do
      field :name, :string
      belongs_to :target, Language
      belongs_to :written, Language

    end
    
      def changeset(language_name, params \\ %{}) do
        language_name
        |> cast(params, [:name])
        |> validate_required([:name])
      end

end