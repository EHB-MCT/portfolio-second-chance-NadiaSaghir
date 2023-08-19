const express = require("express");
const crypto = require('crypto');
const db = require('../db/db');
const { isAuthenticated } = require('../middleware/middleware');

const router = express.Router();

// User Routes
router.post('/signup', createUser);
router.post('/login', loginUser);
router.get('/users', isAuthenticated, getAllUsers);
router.delete('/users', deleteUser);
router.delete('/users/:id', deleteUserById);

// Recipe Routes
router.post('/recipes', isAuthenticated, createRecipe);
router.get('/recipes', getAllRecipes);

module.exports = router;