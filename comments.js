// create a new express app
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const commentsPath = path.join(__dirname, 'comments.json');
const comments = require(commentsPath);

// middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// routes
app.get('/api/comments', (req, res) => {
  res.json(comments);
});

app.post('/api/comments', (req, res) => {
  const newComment = req.body;
  newComment.id = Date.now();
  comments.push(newComment);

  fs.writeFile(commentsPath, JSON.stringify(comments, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Error writing new comment');
    }

    res.json(newComment);
  });
});

// start the server
app.listen(3000, () => {
  console.log('Server is listening on http://localhost:3000');
});