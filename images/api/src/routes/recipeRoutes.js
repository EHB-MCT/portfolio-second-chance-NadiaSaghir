const express = require("express");
const db = require('../db/db');
const { isAuthenticated } = require('../middleware/middleware');

const recipeRouter = express.Router();


// Create user table if doesn't exist
db.schema
  .hasTable('recipes')
  .then((exists) => {
    if (!exists) {
      return db.schema.createTable('recipes', function (table) {
        table.increments('id').primary();
        table.integer('user_id').unsigned();
        table.string('title');
        table.text('ingredients');
        table.text('preparation');
        table.integer('servings');
        table.string('image');
      });
    }
  })
  .then(() => console.log('Recipes table created'))
  .catch((error) => console.error(error));

// Post a new recipe
recipeRouter.post('/', isAuthenticated, async (req, res) => {
    const { title, ingredients, preparation, servings, image } = req.body;
    const userId = req.session.userId;

    try {
        await db('recipes').insert({
            title,
            ingredients,
            preparation,
            servings,
            image,
            user_id: userId,
        });

        res.status(201).json({ message: 'Recipe added successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while adding the recipe.' });
    }
});

// Get all recipes
recipeRouter.get('/', async (req, res) => {
    try {
        const recipes = await db
            .select('recipes.id', 'title', 'ingredients', 'preparation', 'servings', 'image', 'user_id', 'users.name as user_name')
            .from('recipes')
            .leftJoin('users', 'recipes.user_id', 'users.id');

        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching recipes.' });
    }
});

module.exports = recipeRouter;