const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const { getReposByUsername, getTopRepos } = require('../helpers/github.js');
let app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  if (req.body.username) {
    getReposByUsername(req.body.username);
  } else {
    console.error('Error: req.body.username is not defined')
  }

  res.end();
});

app.get('/repos', function (req, res) {
  getTopRepos((data) => {
    res.send(data);
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});