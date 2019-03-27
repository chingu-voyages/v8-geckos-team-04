defmodule GuessTheLanguage.Game.WatchedVideo do
    use Ecto.Schema

    alias GuessTheLanguage.Game.Video
    alias GuessTheLanguage.Game.Language

    schema "watched_video" do
        belongs_to :video, Video
        belongs_to :language, Language
    end
end