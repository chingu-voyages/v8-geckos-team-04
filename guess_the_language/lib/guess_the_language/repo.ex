defmodule GuessTheLanguage.Repo do
  use Ecto.Repo,
    otp_app: :guess_the_language,
    adapter: Ecto.Adapters.Postgres
end
