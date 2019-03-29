defmodule GuessTheLanguage.Play do
    """
    Game business logic goes here
    """

    def start_game(%{"user_id" => user_id} = session) do
        session
    end

    #  -> 
    #Creates a session and sends back a random video
    def start_game do
        #select random video, send state back
        "This is the start"
    end

    # %Session{}, %Choice{} -> true || %{correct_choice => 'uuid_value', selected_choice => 'uuid_value'}
    # Gets a session and choice and returns true if correct choice or a map with selected/correct answer
    def select_choice(session, choice) do
        #take choice from state and
        #first verify the choice is among the possible ones
        # verify if correct or not, either way save choice and associate it with the session
        #sent back the correct choice if correct || send back the wrong choice and the correct choice
    end

    # %Session{} -> %Screen{}
    #Takes current session and sends a video it hasn't seen yet
    def next_screen(session) do

    end


end