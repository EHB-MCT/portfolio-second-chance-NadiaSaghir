import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Functional component representing the navigation menu.
 * This component renders a list of links for navigating the application.
 *
 * @returns {JSX.Element} The JSX element representing the navigation menu.
 */
function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Recipes</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li>
          <Link to="/login">Log In</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;