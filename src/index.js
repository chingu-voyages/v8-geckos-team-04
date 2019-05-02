import React from 'react';
import { render } from 'react-dom';

import App from './components/App';

// Add global variables
import { setGlobal } from 'reactn';

setGlobal({
  score: 0,
  qNum: 0, // Question number
});

render((

    <App />

), document.getElementById('root'));