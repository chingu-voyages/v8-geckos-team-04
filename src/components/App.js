import React, { Component } from 'react';

// routing so we can visit an admin page or other navigation within the app.
import { BrowserRouter } from 'react-router-dom'; 

class App extends Component {
  render() {

    return (

      <BrowserRouter>

        <Main />

      </BrowserRouter>
    );

  }
}

export default App;
