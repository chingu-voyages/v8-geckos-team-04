import React, { useState } from 'react';
import Video from './Video';
import { useGlobal } from 'reactn';

function Game() {
  const [global, setGlobal] = useGlobal();

  function newGame(){
    window.location.reload(); // refresh the page
  }

  return(
    <div>
      <h1>Guess The Language</h1>
        <Video />
        <div className='score-box'>
          Question: 1/10<br />
          Score: {global.score}
        </div>
        <button className='new-game-btn' onClick={newGame}>New Game</button>
    </div>
  )
} 

export default Game;