const express = require ("express");
const knex = require('knex');

const app = express();
const port = 3000;

// Create a Knex instance with PostgreSQL as the database driver
const db = knex({
    client: 'pg',
    connection: {
      host: 'db',
      user: 'root',
      password: 'root',
      database: 'test'
    }
  });
  
// Create the user table if it doesn't exist
db.schema
.hasTable('users')
.then((exists) => {
  if (!exists) {
    return db.schema.createTable('users', function (table) {
      table.increments('id').primary();
      table.string('name');
      table.string('email').unique();
    });
  }
})
  .then(() => console.log('User table created'))
  .catch((error) => console.error(error));

app.use(express.json()); // Enable JSON parsing for incoming requests

// Define a route to add a new user
app.post('/users', async (req, res) => {
  const { name, email } = req.body;

  try {
    // Insert the new user into the database
    await db('users').insert({ name, email });

    res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the user.' });
  }
});

// Define a route to retrieve all users
app.get('/users', async (req, res) => {
  try {
    const users = await db.select().from('users');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching users.' });
  }
});


// New route for the root page
app.get("/", (req, res) => {
    res.send({ message: "Hey world" });
});

app.listen(port, (err) => {
    if (!err) {
        console.log(`Server is running on port ${port}`);
    }
    else {
        console.error(err)
    }
})