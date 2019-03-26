defmodule GuessTheLanguageWeb.Router do
  use GuessTheLanguageWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", GuessTheLanguageWeb do
    pipe_through :api
    get "/videos", VideoController, :index

    post "/videos", VideoController, :add

    get "/videos/:uuid", VideoController, :detail

    delete "/videos/:uuid", VideoController, :delete

  end
  scope "/", GuessTheLanguageWeb do
    pipe_through :browser

    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", GuessTheLanguageWeb do
  #   pipe_through :api
  # end
end
