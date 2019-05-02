import React from 'react';
import Video from './Video';
import { useGlobal } from 'reactn';
import GetData from '../api/GetData';

function Game() {
  const [global] = useGlobal();

  const newGame = () => {
    GetData(); // fetch new data array from backend.
    window.location.href = '/game'; // Start a new game.
  }

  return(
    <div className='sidebars'>
      <h1><a href='/'>Guess The Language</a></h1>
        <div className='score-box'>
          <div className='question'>
            Question: {global.qNum}/10
          </div>
          <div className='score'>
            Score: {global.score}
          </div>
        </div>
        <Video />
        <div className='new-game-btn-wrapper'>
          <button className='new-game-btn' onClick={newGame}>New Game</button>
        </div>
    </div>
  )
} 

export default Game;