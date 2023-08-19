const express = require("express");
const db = require('../db/db');
const { isAuthenticated } = require('../middleware/middleware');

const recipeRouter = express.Router();

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