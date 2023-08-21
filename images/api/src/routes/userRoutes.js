const express = require("express");
const crypto = require('crypto');
const db = require('../db/db');
const { isAuthenticated } = require('../middleware/middleware');

const userRouter = express.Router();

// Create user table if doesn't exist
db.schema
.hasTable('users')
.then((exists) => {
  if (!exists) {
    return db.schema.createTable('users', function (table) {
      table.increments('id').primary();
      table.string('name');
      table.string('email').unique();
      table.string('password');
    });
  }
})
  .then(() => console.log('User table created'))
  .catch((error) => console.error(error));

/**
 * Route for user registration (Sign Up).
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @returns {void}
 */
userRouter.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Create a hash
        const hash = crypto.createHash('sha256');

        // Hash password
        const hashedPassword = hash.update(password).digest('hex');

        // Insert new user into users table with hashed password
        await db('users').insert({ name, email, password: hashedPassword });

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        // Log error to console for debugging
        console.error(error);
        res.status(500).json({ error: 'An error occurred while registering the user.' });
    }
});

/**
 * Route for user login.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @returns {void}
 */
userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user with this email exists
        const user = await db('users').where('email', email).first();

        if (!user) {
            res.status(404).json({ error: 'User not found.' });
        } else {
            const hash = crypto.createHash('sha256');
            const hashedInputPassword = hash.update(password).digest('hex');

            // Compare input password with hashed password stored in users table
            if (hashedInputPassword === user.password) {
                req.session.userId = user.id;
                res.json({ message: 'User logged in successfully.' });
            } else {
                res.status(401).json({ error: 'Incorrect password.' });
            }
        }
    } catch (error) {
        // Log error to console for debugging
        console.error(error);
        res.status(500).json({ error: 'An error occurred while logging in.' });
    }
});

/**
 * Route for getting all users from the database.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @returns {void}
 */
userRouter.get('/users', async (req, res) => {
    try {
        const users = await db.select().from('users');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching users.' });
    }
});

/**
 * Route for deleting all users from the database.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @returns {void}
 */
userRouter.delete('/', async (req, res) => {
    try {
        // Delete all users
        await db('users').del();

        res.json({ message: 'All users deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting users.' });
    }
});


/**
 * Route for deleting a specific user by ID.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @returns {void}
 */
userRouter.delete('/users/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        // Delete user with specified ID from the database
        const deletedCount = await db('users').where('id', userId).del();

        if (deletedCount === 0) {
            res.status(404).json({ error: 'User not found.' });
        } else {
            res.json({ message: 'User deleted successfully.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the user.' });
    }
});

module.exports = userRouter;