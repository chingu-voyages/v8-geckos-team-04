import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { useGlobal } from 'reactn';

function Score() {
  const [global, setGlobal] = useGlobal();

  return (
    <div>
      <h1><a href='/'>Guess The Language</a></h1>
      <div>Total Score: {global.score}</div>
      <Route render={({history}) => (
         <button className='view-history-btn' onClick={() => { history.push('/history') }}>
           View History
         </button>
      )} />
      <Route render={({history}) => (
        <button className='new-game-btn' onClick={() => { 
          setGlobal({score: 0, qNum: 1});history.push('/game') }}>
          New Game
        </button>
      )} />
    </div>
  );
}

export default Score;