// Create web server using express
// Load the express module
const express = require('express');
// Create an instance of the express module
const app = express();
// Load the comments module
const comments = require('./comments');
// Load the bodyParser module
const bodyParser = require('body-parser');
// Load the cors module
const cors = require('cors');

// Use the cors middleware
app.use(cors());
// Use the bodyParser middleware
app.use(bodyParser.json());

// Create a GET route that returns the comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Create a POST route that adds a comment
app.post('/comments', (req, res) => {
  const { author, text } = req.body;
  if (author && text) {
    comments.push({ author, text });
    res.json({ msg: 'comment added' });
  } else {
    res.status(400).json({ msg: 'invalid request' });
  }
});

// Create a DELETE route that deletes a comment
app.delete('/comments/:index', (req, res) => {
  const index = req.params.index;
  if (comments[index]) {
    comments.splice(index, 1);
    res.json({ msg: 'comment deleted' });
  } else {
    res.status(404).json({ msg: 'comment not found' });
  }
});

// Start the server
app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});