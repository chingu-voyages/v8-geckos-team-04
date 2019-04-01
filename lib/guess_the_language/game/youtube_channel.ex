defmodule GuessTheLanguage.Game.YoutubeChannel do
    use Ecto.Schema
    import Ecto.Changeset
    
    alias GuessTheLanguage.Game.YoutubeVideo
    
    schema "youtube_channel" do
      field :youtube_uuid, :string
      field :name, :string

      has_many :youtube_video, YoutubeVideo

end
end