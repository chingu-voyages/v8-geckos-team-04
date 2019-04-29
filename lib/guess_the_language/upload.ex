defmodule GuessTheLanguage.Upload do
    alias GuessTheLanguage.Upload

    def get_details(file) do
        {:ok, body} = File.read(file)
        video = Jason.decode(body)
        {video.duration, video.id}
    end

    def up do
        
      files = Path.wildcard("files/*.json")
      |> Enum.map(fn file -> get_details(file) end)
    end
    
end