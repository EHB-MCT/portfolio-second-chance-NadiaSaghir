const express = require("express");
const crypto = require('crypto');
const db = require('../db/db');
const { isAuthenticated } = require('../middleware/middleware');

const router = express.Router();

/**
 * Route for creating a new user account.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @returns {void}
 */
router.post('/signup', createUser); 

/**
 * Route for user login.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @returns {void}
 */
router.post('/login', loginUser); 

/**
 * Route for getting all users from the database.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @returns {void}
 */
router.get('/users', isAuthenticated, getAllUsers); 

/**
 * Route for deleting all users from the database.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @returns {void}
 */
router.delete('/users', deleteUser); 

/**
 * Route for deleting a specific user using their ID number.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @returns {void}
 */
router.delete('/users/:id', deleteUserById); 


/**
 * Route for creating a new recipe in the database with a user ID number.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @returns {void}
 */
router.post('/recipes', createRecipe); 

/**
 * Route for getting all recipes posted by all users with user ID and name.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @returns {void}
 */
router.get('/recipes', getAllRecipes); 

module.exports = router;