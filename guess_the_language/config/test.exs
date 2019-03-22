use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :guess_the_language, GuessTheLanguageWeb.Endpoint,
  http: [port: 4002],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :guess_the_language, GuessTheLanguage.Repo,
  username: "postgres",
  password: "postgres",
  database: "guess_the_language_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
