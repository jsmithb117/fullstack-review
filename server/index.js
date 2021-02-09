const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const { getReposByUsername } = require('../helpers/github.js');
let app = express();

app.use((req, res, next) => {
  console.log('new request');
  next();
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log('new request');
  next();
});

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  console.log('POST /repos, req.body:');
  console.log(req.body);

  getReposByUsername(req.body.username);


  res.send('woot');

  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  console.log('GET /repos');
  res.send();
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

