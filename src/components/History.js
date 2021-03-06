import React from 'react';
import { Route } from 'react-router-dom';
import GetData from '../api/GetData';

// Clear localStorage
// localStorage.clear();
// get localStorage data
const scores = []; //set initial data to an empty list
const localStorageKey = 'usrName_localScores';
if (!localStorage.getItem(localStorageKey)) {
  localStorage.setItem(localStorageKey, JSON.stringify(scores));
}

function History() {
  const newGame = () => {
    GetData(); //fetch new data array from backend.
    window.location.href = '/game'; //Start a new game.
  }
  
  
  const localScores = JSON.parse(localStorage.getItem(localStorageKey));
  const output = localScores.map((item,index) => <tr key={index}><td>{item.date}</td>
                                            <td>{item.time}</td>
                                            <td>{item.score}</td></tr>);

  return (
    <div className='history-page'>
      <h1><a href='/'>Guess The Language</a></h1>
      <h3>Game and Score History</h3>
      <table className="center">
        <tbody>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Score</th>
          </tr>
          {output}
        </tbody>
      </table>
      <Route render={() => (
          <button className='new-game-btn' onClick={newGame}>
            Next Game
          </button>
        )} />
    </div>
  );
}


export default History;
