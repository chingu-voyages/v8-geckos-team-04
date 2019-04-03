import React from 'react';

// routing so we can visit an admin page or other navigation within the app.
import { Switch, Route } from 'react-router-dom';
import Main from './Main';
import Game from './Game';
import Score from './Score';
import History from './History';
import Admin from './Admin';
import Languages from '../api/Languages';

// The App component renders one of the provided
// Routes. If the route is '/', then we will display
// the Main component (contains the video and buttons).
// If the route is /admin, we will display the Admin component.

const App = () => {

  Languages(); // Load data store.
  
  return (
    <main>
      <Switch>
        <Route exact path='/' component={Main}/>
        <Route exact path='/game' component={Game}/>
        <Route exact path='/score' component={Score}/>
        <Route exact path='/history' component={History}/>
        <Route path='/admin' component={Admin}/>
      </Switch>
    </main>
  )
}



export default App
