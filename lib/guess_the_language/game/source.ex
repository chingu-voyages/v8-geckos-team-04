defmodule GuessTheLanguage.Game.Source do
    use Ecto.Schema
    import Ecto.Changeset
    
    alias GuessTheLanguage.Game.{Video, YoutubeChannel, Source}
    alias GuessTheLanguage.Repo

    schema "source" do
        field :uuid, Ecto.ShortUUID, autogenerate: true
        field :name, :string
        field :website, :string
        has_many :youtube_channel, YoutubeChannel
        has_many :video, Video
    end

    def valid_source({:ok, source}), do: source

    def valid_source({:error, changeset}) do
        case changeset.errors do
          [{:uuid, error_message}] -> error_message
          [{:website, error_message}] -> Repo.get_by(Source, name: changeset.changes.website)
        end
  
    end


    def insert(params) do
        params
        |> changeset
        |> Repo.insert
        |> valid_source
    end

    def changeset(params \\ %{}) do
        %Source{}
        |> cast(params, [:name, :website])
        |> validate_required([:name, :website])
        |> unique_constraint(:website)
        |> unique_constraint(:uuid)
      end
end