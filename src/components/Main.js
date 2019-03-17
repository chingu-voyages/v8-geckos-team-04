import React from 'react';

// video and choice buttons.
import Video from './Video';

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
    Unit tests in /src/__tests__ <br />

    <Video />

  </div>

)

export default Main;