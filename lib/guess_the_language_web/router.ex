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

    get "/videos/next", VideoController, :next

    post "/videos", VideoController, :create

    get "/videos/:uuid", VideoController, :show

    delete "/videos/:uuid", VideoController, :delete

    resources "languages", LanguageController, param: "uuid"

    resources "quizzes", QuizController, param: "uuid"

    resources "language_choices", LanguageChoiceController, param: "uuid"

    resources "language_videos", LanguageVideoController, param: "uuid"

  end
  scope "/", GuessTheLanguageWeb do
    pipe_through :browser

    get "/", PageController, :index
    
    get "/api/create_video", VideoController, :create_page

    get "/api/create_language_choice", LanguageChoiceController, :create_page

    get "api/update", LanguageController, :update_page
  end

  # Other scopes may use custom stacks.
  # scope "/api", GuessTheLanguageWeb do
  #   pipe_through :api
  # end
end
