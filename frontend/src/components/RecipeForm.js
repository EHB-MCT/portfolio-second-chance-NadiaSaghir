import React, { useState } from 'react';

function RecipeForm() {
    const [formData, setFormData] = useState({
      title: '',
      ingredients: '',
      preparation: '',
      servings: '',
      image: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch('http://localhost:80/recipes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (response.status === 201) {
            // Recipe posted successfully, you can add a success message or redirect
            console.log('Recipe posted successfully.');
          } else {
            // Handle other status codes, such as errors
            console.error('Failed to post recipe.');
          }
        } catch (error) {
          console.error('An error occurred while posting the recipe:', error);
        }
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      return (
        <div>
          <h2>Post a Recipe</h2>
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
              ></textarea>
            </div>
            <div>
              <label htmlFor="preparation">Preparation</label>
              <textarea
                id="preparation"
                name="preparation"
                value={formData.preparation}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div>
              <label htmlFor="servings">Servings</label>
              <input
                type="text"
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
            <button type="submit">Post Recipe</button>
          </form>
        </div>
      );
    }

export default RecipeForm;
