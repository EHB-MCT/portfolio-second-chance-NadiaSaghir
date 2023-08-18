const express = require ("express");
const knex = require('knex');
const crypto = require('crypto');

const app = express();
const port = 3000;

app.use(express.json());

// Knex instance with PostgreSQL as the database driver
const db = knex({
    client: 'pg',
    connection: {
      host: 'db',
      user: 'root',
      password: 'root',
      database: 'test'
    }
  });

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

// POST Sign Up
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      // Create a hash
      const hash = crypto.createHash('sha256');
  
      // Hash password
      const hashedPassword = hash.update(password).digest('hex');
  
      // Insert new user to users table with hashed password
      await db('users').insert({ name, email, password: hashedPassword });
  
      res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while registering the user.' });
    }
  });
   

  app.listen(port, (err) => {
    if (!err) {
        console.log(`Server is running on port ${port}`);
    }
    else {
        console.error(err)
    }
})