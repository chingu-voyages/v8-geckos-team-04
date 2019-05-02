import React from 'react';
import { Route } from 'react-router-dom';

const Main = () => (

  <div>
    <div className='home-page'>
      <h1><a href='/'>Guess The Language</a></h1>
      <h3>The game is simple, watch a short video and guess the language spoken.</h3>
        <Route render={({history}) => (
          <button onClick={() => { history.push('/game') }}>
            Start Playing
          </button>
        )} />
    </div>
  </div>

)

export default Main;