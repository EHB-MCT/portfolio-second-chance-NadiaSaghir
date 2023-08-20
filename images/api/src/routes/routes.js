const express = require("express");
const crypto = require('crypto');
const db = require('../db/db');
const { isAuthenticated } = require('../middleware/middleware');

const router = express.Router();

// User Routes
router.post('/signup', createUser); // MAKE A NEW USER ACCOUNT
router.post('/login', loginUser); // LOGIN WITH USER ACCOUNT
router.get('/users', isAuthenticated, getAllUsers); // GET ALL USERS THAT ARE IN DB
router.delete('/users', deleteUser); // DELETE ALL USERS FROM DATABASE
router.delete('/users/:id', deleteUserById); // DELETE ONE SPECIFIC USER USING ID NUMBER

// Recipe Routes
router.post('/recipes', createRecipe); // POST A RECIPES IN DATABASE WITH USER ID NUMBER
router.get('/recipes', getAllRecipes); // GET ALL RECIPES POSTED BY ALL USERS WITH USER ID AND NAME

module.exports = router;