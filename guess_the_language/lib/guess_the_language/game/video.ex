defmodule GuessTheLanguage.Game.Video do
    use Ecto.Schema
    import Ecto.Changeset
    alias GuessTheLanguage.Repo
    alias GuessTheLanguage.Game.YoutubeVideo
    alias GuessTheLanguage.Accounts.User
    alias GuessTheLanguage.Game.Language
    
    @derive {Jason.Encoder, only: [:uuid, :youtube_video, :user]}
    schema "video" do
      field :uuid, Ecto.UUID, autogenerate: true
      #field :duration, :int
      has_one :youtube_video, YoutubeVideo
      belongs_to :user, User
    end

    def changeset(video, params \\ %{}) do
        video
        |> cast(params, [:user_id])
        |> validate_required([:user_id])
    end
end