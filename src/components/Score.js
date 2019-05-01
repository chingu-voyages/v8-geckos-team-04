import React from 'react';
import { Route } from 'react-router-dom';
import { useGlobal } from 'reactn';
import GetData from '../api/GetData';

function Score() {
  const [global] = useGlobal();

  const newGame = () => {
    GetData(); // fetch new data array from backend.
    window.location.href = '/game'; // Start a new game.
  }
  const viewHistory = () => {
    window.location.href = '/history'; // Start a new game.
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
        <Route render={() => (
          <button className='view-history-btn' onClick={viewHistory}>
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