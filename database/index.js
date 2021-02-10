const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

mongoose.connection.on('error', err => console.error(err));

let repoSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  name: String,
  html_url: String,
  url: String,
  description: String,
  forks_count: Number,
  watchers: Number,
  owner: {
    login: String,
    id: Number,
    avatar_url: String,
    url: String,
    html_url: String
}});

let Repo = mongoose.model('Repo', repoSchema);

let save = (err, dataArray) => {
  if (err) {
    console.error(err);
  }
  Repo.insertMany(dataArray, (err, response) => {
    if(err) {
      console.error(err);
    }
  })
}

let query = (err, queryString, cb) => {
  Repo.find({}, null, null, (err, response) => {
    cb(response);
  })
}

module.exports.save = save;
module.exports.query = query;