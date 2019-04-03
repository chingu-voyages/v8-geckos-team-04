import React from 'react';
import Video from './Video';
import { useGlobal } from 'reactn';

function Game() {
  const [global] = useGlobal();

  const newGame = () => {

    window.location.href = '/game'; // Start a new game.
  }

  return(
    <div className='sidebars'>
      <h1><a href='/'>Guess The Language</a></h1>
        <Video />
        <div className='score-box'>
          Question: {global.qNum}/10<br />
          Score: {global.score}
        </div>
        <button className='new-game-btn' onClick={newGame}>New Game</button>
    </div>
  )
} 

export default Game;