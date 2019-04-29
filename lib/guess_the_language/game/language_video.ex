defmodule GuessTheLanguage.Game.LanguageVideo do
    use Ecto.Schema
    import Ecto.Changeset
    alias GuessTheLanguage.Repo
    alias GuessTheLanguage.Game
    alias GuessTheLanguage.Game.{Language, LanguageVideo, Video}

    @derive {Jason.Encoder, only: [:uuid, :start_time, :end_time]}
    schema "language_video" do
        field :uuid, Ecto.ShortUUID, autogenerate: true
        field :start_time, :integer, default: 0
        field :end_time, :integer, default: 0
        belongs_to :video, Video
        belongs_to :language, Language
    end

    def valid_insert({:ok, language_video}), do: language_video

    def valid_insert({:error, changeset}) do
      %{"error" =>  Game.translate_error(changeset)}
    end

    def insert(params \\ %{}) do
      changeset(%LanguageVideo{}, params)
      |> Repo.insert
      |> valid_insert
    end

    defp valid_delete({:error, changeset}) do
      %{"error" =>  Game.translate_error(changeset)}
    end

    defp valid_delete({:ok, language_video}) do
      language_video
    end

    def delete(%{"uuid" => _uuid} = params) do
      case get_by_uuid(params) do
        %{"error" => errors} ->
           %{"error" => errors}
        language_video -> 
            language_video
            |> Repo.delete
            |> valid_delete
        end
      end
    
    defp valid_get(false) do
      %{"error" =>  "Unable to perform the operation on LanguageVideo as that uuid isn't valid"}
    end

    defp valid_get(nil) do
      %{"error" =>  "Unable to perform perform operation as a LanguageVideo with that uuid doesn't exist"}
    end

    defp valid_get(language_video) do
      language_video
    end

    #%{} -> %LanguageVideo{} || %{"error" =>..}
    def get_by_uuid(%{"uuid" => uuid} = params) do
      changeset = uuid_changeset(params)

      if changeset.valid? do
        Repo.get_by(LanguageVideo, uuid: uuid) |> valid_get
      else
        valid_get(false)
      end
    end

    defp valid_update({:error, changeset}) do
      %{"error" => Game.translate_error(changeset)}
    end

    defp valid_update({:ok, language_video}) do
      language_video
    end 

    def update(%{"uuid" => _uuid} = params) do
      case get_by_uuid(params) do
        %{"error" => errors} ->
           %{"error" => errors}
        language_video -> 
            changeset = changeset(language_video, params)
            if changeset.valid? do
            Repo.insert_or_update(changeset) |> valid_update
            end
        end
    end


    def uuid_changeset(params \\ %{}) do
      %LanguageVideo{}
      |> cast(params, [:uuid])
    end

    def changeset(language_video, params \\ %{}) do
        language_video
        |> cast(params, [:video_id, :language_id, :start_time, :end_time])
        |> validate_required([:video_id, :language_id, :start_time, :end_time])
        |> foreign_key_constraint(:language_id)
        |> foreign_key_constraint(:video_id)
        |> unique_constraint(:uuid)
      end
end