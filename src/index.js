import React from 'react';
import { render } from 'react-dom';

// routing so we can visit an admin page or other navigation within the app.
import { BrowserRouter } from 'react-router-dom'; 

import App from './components/App';

render((

  <BrowserRouter>
    <App />
  </BrowserRouter>

), document.getElementById('root'));