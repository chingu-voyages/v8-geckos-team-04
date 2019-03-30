import React, { useState } from 'react';

// Clear localStorage
// localStorage.clear();
const scores = [];

const localStorageKey = 'usrName_localScores';
if (!localStorage.getItem(localStorageKey)) {
	localStorage.setItem(localStorageKey, JSON.stringify(scores));
}

function History() {
  const localScores = JSON.parse(localStorage.getItem(localStorageKey));
  const output = localScores.map(item => <tr><td>{item.date}</td><td>{item.time}</td><td>{item.score}</td></tr>);

  return (
    <div>
      <h1><a href='/'>Guess The Language</a></h1>
      <h3>Playing History</h3>
      <table>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Score</th>
        </tr>
        {output}
      </table> 
    </div>
  );
}


export default History;