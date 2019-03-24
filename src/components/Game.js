import React, { useState } from 'react';
import Video from './Video';
import { useGlobal } from 'reactn';

function Game() {
  const [score, setScore] = useGlobal('score');

  function newGame(){
    window.location.reload(); // refresh the page
  }

  return(
    <div>
      <h1>Guess The Language</h1>
        <Video />
        <div className='score-box'>
          Question: 1/10<br />
          Score: {score}
        </div>
        <button className='new-game-btn' onClick={newGame}>New Game</button>
    </div>
  )
} 

export default Game;