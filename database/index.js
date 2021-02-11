const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/fetcher', { useMongoClient: true });

mongoose.connection.on('error', err => {
  console.log('in index.js');
  console.error(err);
});

let repoSchema = mongoose.Schema({
  repoId: {
    type: Number,
    index: true,
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

let save = (dataArray) => {
  console.log('saving');
  Repo.insertMany(dataArray)
  .catch((err) => {
    if (err) {
      console.log('in save');
      console.error(err);
    }
  })
  return;
}

let query = (err, queryString, cb) => {
  console.log('querying');
  Repo.find({}, null, null, (err, response) => {
    cb(response);
  })
}

module.exports.save = save;
module.exports.query = query;