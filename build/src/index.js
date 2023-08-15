// Import required modules
const express = require('express');

// Create an instance of the Express application
const app = express();

// Define a route
app.get('/', (req, res) => {
  res.send('Hello');
  
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
