const express = require("express");
const crypto = require('crypto');
const db = require('../db/db');
const { isAuthenticated } = require('../middleware/middleware');

const userRouter = express.Router();

// POST Sign Up
// http://localhost:80/signup
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

// POST login
// http://localhost:80/login
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

// GET all users
// http://localhost:80/users
userRouter.get('/users', async (req, res) => {
    try {
        const users = await db.select().from('users');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching users.' });
    }
});

// DELETE all users
// http://localhost:80/users
userRouter.delete('/', async (req, res) => {
    try {
        // Delete all users
        await db('users').del();

        res.json({ message: 'All users deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting users.' });
    }
});

// DELETE a specific user by ID
// http://localhost:80/users/6
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