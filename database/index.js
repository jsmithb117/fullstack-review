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
  description: String,
  forks_count: Number,
  watchers: Number,
  owner: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (dataArray) => {
  if (dataArray.length === 0) {
    return;
  }
  const filter = { repoId: dataArray[0].id };
  const update = dataArray[0];

  Repo.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true
  })
    .then(() => {
      save(dataArray.slice(1));
    })
    .catch((err) => {
      if (err.code !== 11000) console.error(err);
    });
};

let queryAll = (cb) => {
  console.log('querying');
  Repo.find({}, null, null, (err, response) => {
    if (err) {
      console.error('Error doing Repo.find(): ', err);
    }
    cb(response);
  })
}

module.exports.save = save;
module.exports.queryAll = queryAll;