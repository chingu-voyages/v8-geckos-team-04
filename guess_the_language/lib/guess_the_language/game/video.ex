defmodule GuessTheLanguage.Game.Video do
  @derive Jason.Encoder
    defstruct [:youtube_id, :language_quiz]
end