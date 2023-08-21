// Import the Knex library
const knex = require('knex');

/**
 * Knex instance with PostgreSQL as the database driver.
 *
 * @type {import('knex')}
 */
const db = knex({
    client: 'pg', // PostgreSQL database driver
    connection: {
        host: 'db', // Hostname of the PostgreSQL server
        user: process.env.POSTGRES_USER, // PostgreSQL user provided via environment variable
        password: process.env.POSTGRES_PASSWORD, // PostgreSQL password provided via environment variable
        database: process.env.POSTGRES_DB, // PostgreSQL database name provided via environment variable
    },
});


/**
 * Test the database connection.
 *
 * @returns {Promise<void>} A Promise that resolves when the connection is successful or rejects on error.
 */db.raw('SELECT 1')
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });

/**
 * Export the Knex instance for use in other parts of the application.
 *
 * @type {import('knex')}
 */module.exports = db;
