const session = require('express-session');

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ error: 'You need to be logged in to post a recipe.' });
    }
}

module.exports = {
    isAuthenticated
};