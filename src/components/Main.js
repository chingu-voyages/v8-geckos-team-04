import React from 'react';
import { Route } from 'react-router-dom'


const Main = () => (

  <div>

    Pull me to local to set up a clean local development environment (if you need) then run npm install <br />

    This commit includes a frontend local environment setup as of March 16, 2019,<br />
    but not the backend of Elixer and the Phoenix framework yet<br /><br />

    npm start <br />
    OR <br />
    npm start --watch (hot reload) <br />
    npm test (run unit tests that are in /src/__tests__ folder) <br /><br />

    styles.css is in /public/css <br />
    Images in public/images <br />
    Extra js scripts /public/js <br />
    Unit tests in /src/__tests__ <br /><br />

    Page path: <br />
    main: / <br />
    game: /game <br />
    score: /score <br />
    history: /history <br />
    admin: /admin <br />
    <br /><br />

    *** Main content begins ***
    <div className='home-page'>
      <h1>Guess The Language</h1>
      <h3>The game is simple, watch a short video and guess the language spoken.</h3>
      <Route render={({history}) => (
        <button onClick={() => { history.push('/game') }}>
          Start Playing
        </button>
      )} />
    </div>


  </div>

)

export default Main;