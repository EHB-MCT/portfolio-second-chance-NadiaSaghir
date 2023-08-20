import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import RecipeList from './components/RecipeList';
import UserRegistration from './components/UserRegistration';
import UserLogin from './components/UserLogin';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={RecipeList} />
        <Route path="/signup" component={UserRegistration} />
        <Route path="/login" component={UserLogin} />
        {}
      </Switch>
    </Router>
  );
}

export default App;