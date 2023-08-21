// Import necessary React features
import React, { useEffect, useState } from 'react';
import Navbar from './Navigation';

/**
 * Functional component representing a list of recipes.
 *
 * @returns {JSX.Element} The JSX element representing the list of recipes.
 */
function RecipeList() {
  // State to store recipes and loading status
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch recipes from server when the component mounts
    fetch('http://localhost:80/recipes')
      .then((response) => response.json())
      .then((data) => {
        // Set retrieved recipes and update loading status
        setRecipes(data);
        setLoading(false);
      })
      .catch((error) => {
        // Handle errors during data fetching
        console.error('Error fetching recipes:', error);
        setLoading(false);
      });
  }, []);

  // Display a loading message while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render the list of recipes
  return (
    <div>
      <Navbar />
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>Ingredients: {recipe.ingredients}</p>
            <p>Preparation: {recipe.preparation}</p>
            <p>Servings: {recipe.servings}</p>
            <img src={recipe.image} alt={recipe.title} width="200" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeList;