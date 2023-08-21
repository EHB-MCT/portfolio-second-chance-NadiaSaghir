import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import RecipeList from './components/RecipeList';
import UserRegistration from './components/UserRegistration';
import UserLogin from './components/UserLogin';
import RecipeForm from './components/RecipeForm';

/**
 * The main application component responsible for routing.
 *
 * @returns {JSX.Element} The JSX element representing the main application component.
 */
function App() {
  return (
    <Router>
      <Switch>
        {/* Route for the home page displaying recipes */}
        <Route path="/" exact component={RecipeList} />
        {/* Route for user registration */}
        <Route path="/signup" component={UserRegistration} />
        {/* Route for user login */}
        <Route path="/login" component={UserLogin} />
        {/* Route for adding a new recipe */}
        <Route path="/add-recipe" component={RecipeForm} />
        {}
      </Switch>
    </Router>
  );
}

export default App;