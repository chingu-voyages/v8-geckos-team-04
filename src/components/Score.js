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
      <div className='final-score-box'>
        <div>
          Total Score: 
        </div>
        <div className='final-score'>
            {global.score} / 100
        </div>
      </div>
      <div className='score-flex-button-box'>
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
    </div>
  );
}

export default Score;