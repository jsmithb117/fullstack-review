const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

// var db = mongoose.connect;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

mongoose.connection.on('error', err => console.error(err));

let repoSchema = mongoose.Schema({
  id: Number,
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

let Repo = mongoose.model('Repo', repoSchema); //creates a model

let save = (err, dataArray) => {
  if (err) {
    console.error('error in "save"');
    console.error(err);
  }
  Repo.insertMany(dataArray, (err, response) => {
    if(err) {
      console.error(err);
    }
    console.log('db insertMany response: ', response)
  })
}

let query = (err, queryString, cb) => {
  console.log('query');
  //do find on database for queryString
  Repo.find({}, null, null, (err, response) => {
    console.log('find responded');
    // console.log(response);
    cb(response);
  })
  //.then return response
}
module.exports.save = save;
module.exports.query = query;



// let save = (err, data) => {
//   console.log ('saving');
//   if(err) {
//     console.error(err);
//   }
//   const newRepo = new Repo(data); //
//   console.log('new repo')
//   newRepo.save()
//   .then((response) => {
//     // console.log('db response: ', response);
//   })
//   .catch((err) => {
//     if (err) {
//       console.error(err);
//     }
//   })
//   Repo.find((err, data) => {
//     console.log('find data');
//     console.log(data);
//   })
//   // TODO: Your code here
//   // This function should save a repo or repos to
//   // the MongoDB
// }

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/fetcher');

// // var db = mongoose.connect;
// // db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// let repoSchema = mongoose.Schema({
//   id: Number,
//   name: String,
//   full_name: String,
//   html_url: String,
//   url: String,
//   description: String,
//   forks_count: Number,
//   watchers: Number,
//   owner: {
//     login: String,
//     id: Number,
//     avatar_url: String,
//     url: String,
//     html_url: String
// }});

// let Repo = mongoose.model('Repo', repoSchema); //creates a model

// let save = (err, data) => {
//   console.log ('saving');
//   if(err) {
//     console.error(err);
//   }
//   Repo.insertMany(data, {rawResult: false, orderd: false}, (err, docs) => {
//     console.log('docs: ', docs);
//   })
//   .then(() => {
//     return Repo.find().lean()
//   })
//   .then((data) => {
//     console.log ('got data: ', data);
//   })
//   // TODO: Your code here
//   // This function should save a repo or repos to
//   // the MongoDB
// }

// module.exports.save = save;




