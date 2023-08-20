import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from './Navigation';

/**
 * Functional component representing a form for adding a new recipe.
 *
 * @returns {JSX.Element} The JSX element representing the recipe form.
 */
function RecipeForm() {
  // State to manage form data and display messages
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    preparation: '',
    servings: '',
    image: '',
  });
  const [message, setMessage] = useState('');

  // Access the history object to navigate after form submission
  const history = useHistory();

  /**
   * Event handler for input field changes.
   *
   * @param {Event} e - The input change event.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
   * Event handler for form submission.
   *
   * @param {Event} e - The form submit event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (!formData.title || !formData.ingredients || !formData.preparation || !formData.servings || !formData.image) {
        setMessage('Please fill out all required fields.');
        return; 
      }

    try {
      const response = await fetch('http://localhost:80/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        setMessage('Recipe added successfully.');
        history.push('/'); // Redirect to the home page after successful submission
      } else {
        setMessage('Recipe creation failed.');
      }
    } catch (error) {
      console.error('An error occurred while adding the recipe:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Add a Recipe</h2>
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="ingredients">Ingredients</label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="preparation">Preparation</label>
          <textarea
            id="preparation"
            name="preparation"
            value={formData.preparation}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="servings">Servings</label>
          <input
            type="number"
            id="servings"
            name="servings"
            value={formData.servings}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}

export default RecipeForm;
