defmodule GuessTheLanguage.Upload do
    alias GuessTheLanguage.Upload
    def get_details(file) do
        video = Jason.decode(file)
        {video.duration, video.id}
    end
      
      files = Path.wildcard("files/*.json")
      Enum.map(fn file -> get_details)
      {:ok, body} = File.read()
end