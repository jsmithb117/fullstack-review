const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let dbIp = process.env.DBIP;
if (dbIp == null || dbIp === '') {
  dbIp = 'localhost'
}

mongoose.connect(`mongodb://${dbIp}/fetcher`, { useMongoClient: true });

mongoose.connection.on('error', err => {
  console.error('Mongoose connection error: ', err);
});

let repoSchema = mongoose.Schema({
  _id: Number,
  name: String,
  html_url: String,
  description: String,
  forks_count: Number,
  watchers: Number,
  owner: String
});

let Repo = mongoose.model('Repo', repoSchema);
let save = (dataArray) => {
  console.log('dataArray: ', dataArray);
  if (dataArray.length === 0) {
    console.log('no mo entries: ', dataArray);
    return;
  }
  const filter = { _id: dataArray[0]._id };
  const update = {
    name: dataArray[0].name,
    html_url: dataArray[0].html_url,
    description: dataArray[0].description,
    forks_count: dataArray[0].forks_count,
    watchers: dataArray[0].watchers,
    owner: dataArray[0].owner
  };

  console.log('saving filter: ', filter);
  console.log('saving update: ', update);

  Repo.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true
  })
    .then((response) => {
      console.log('response._doc : ', response._doc);
      save(dataArray.slice(1));
    })
    .catch((err) => {
      if (err) console.error(err);
    });
};

let queryAll = (cb) => {
  Repo.find().exec((err, response) => {
    if (err) {
      console.error('Error doing Repo.find() at queryAll: ', err);
    }
    cb(response);
  });
}

module.exports.save = save;
module.exports.queryAll = queryAll;