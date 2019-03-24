import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { useGlobal } from 'reactn';

function Score() {
  const [score, setScore] = useGlobal('score');

  return (
    <div>
      <h1>Guess The Language</h1>
      <div>Total Score: {score}</div>
      <Route render={({history}) => (
         <button className='view-history-btn' onClick={() => { history.push('/history') }}>
           View History
         </button>
      )} />
      <Route render={({history}) => (
        <button className='new-game-btn' onClick={() => { history.push('/game') }}>
          New Game
        </button>
      )} />
    </div>
  );
}

export default Score;