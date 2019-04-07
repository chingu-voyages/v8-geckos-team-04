import React from 'react';
import { render } from 'react-dom';

import App from './components/App';

// Add global variables
import { setGlobal } from 'reactn';

setGlobal({
  score: 0,
  qNum: 1, // Question number
  languages: [] // Languages array from YouTube.
});

render((

    <App />

), document.getElementById('root'));