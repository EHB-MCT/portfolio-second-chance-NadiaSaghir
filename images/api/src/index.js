require('dotenv').config();
const express = require("express");
const cors = require('cors');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();
const port = 3000;

app.use(express.json());

// Enable CORS for requests from http://localhost:3000
app.use(cors({ origin: 'http://localhost:3000' }));

// Configure session management
app.use(
    session({
        secret: 'its-a-secret-key-you-will-not-find-it-haha',
        resave: false,
        saveUninitialized: true,
    })
);

// Use the user and recipe routes
app.use('/', userRoutes); // USERS ENDPOINTS
app.use('/recipes', recipeRoutes); // RECIPES ENDPOINTS

  app.listen(port, (err) => {
    if (!err) {
        console.log(`Server is running on port ${port}`);
    } else {
        console.error(err);
    }
});