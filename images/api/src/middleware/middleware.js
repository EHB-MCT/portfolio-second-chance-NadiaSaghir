const session = require('express-session');

/**
 * Middleware to check if a user is authenticated.
 *
 * This middleware checks if the request has a user session. If a user session
 * exists, it allows the request to proceed to the next middleware or route
 * handler. If no user session exists, it sends a 401 Unauthorized status with
 * an error message.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function to call.
 * @returns {void}
 */
function isAuthenticated(req, res, next) {
    // Check if a user session exists in the request
    if (req.session.user) {
        next(); // User is authenticated, continue to the next middleware or route handler
    } else {
        // User is not authenticated, send a 401 Unauthorized status with an error message
        res.status(401).json({ error: 'You need to be logged in to post a recipe.' });
    }
}

module.exports = {
    isAuthenticated
};