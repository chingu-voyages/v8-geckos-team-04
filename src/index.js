import React from 'react';
import { render } from 'react-dom';

// routing so we can visit an admin page or other navigation within the app.
import { BrowserRouter } from 'react-router-dom'; 

import App from './components/App';

// Add global variable 'score'
import { setGlobal } from 'reactn';
setGlobal({
  score: 0
});

render((

  <BrowserRouter>
    <App />
  </BrowserRouter>

), document.getElementById('root'));