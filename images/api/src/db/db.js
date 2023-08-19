const knex = require('knex');

// Knex instance with PostgreSQL as the database driver
const db = knex({
    client: 'pg',
    connection: {
        host: 'db',
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
    },
});


// Test the database connection
db.raw('SELECT 1')
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });

module.exports = db;
