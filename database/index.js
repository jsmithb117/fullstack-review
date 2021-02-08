const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: Number,
  name: String,
  full_name: String,
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

let save = (err) => {
  if(err) {
    console.error(err);
  }

  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;