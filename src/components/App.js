import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './Main';
import Admin from './Admin';

// The App component renders one of the provided
// Routes. If the route is '/', then we will display
// the Main component (contains the video and buttons).
// If the route is /admin, we will display the Admin component.

const App = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Main}/>
      <Route path='/admin' component={Admin}/>
    </Switch>
  </main>
)

export default App
