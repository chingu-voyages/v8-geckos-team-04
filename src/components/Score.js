import React from 'react';
import { Route } from 'react-router-dom';
import { useGlobal } from 'reactn';

function Score() {
  const [global] = useGlobal();

  const newGame = () => {
    window.location.href = '/game'; // Start a new game.
  }

  return (
    <div>
      <h1><a href='/'>Guess The Language</a></h1>
      <div>Total Score: {global.score}</div>
      <Route render={({history}) => (
         <button className='view-history-btn' onClick={() => { history.push('/history') }}>
           View History
         </button>
      )} />
      <Route render={() => (
        <button className='new-game-btn' onClick={newGame}>
          New Game
        </button>
      )} />
    </div>
  );
}

export default Score;