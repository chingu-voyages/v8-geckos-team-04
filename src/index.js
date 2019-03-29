import React from 'react';
import { render } from 'react-dom';
import { setGlobal } from 'reactn';

// routing so we can visit an admin page or other navigation within the app.
import { BrowserRouter } from 'react-router-dom'; 

import App from './components/App';

import { Languages } from './api/Languages'; // Language array builder.

const lang = () => {

  return Languages();

}

// Add global variable 'score'
setGlobal({
  score: 0,
  qNum: 1, // Question number
  languages: lang // Languages array from YouTube.
});


render((

  <BrowserRouter>
    <App />
  </BrowserRouter>

), document.getElementById('root'));