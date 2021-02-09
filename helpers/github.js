const axios = require('axios');
const config = require('../config.js');
const db = require('../database/index.js');

let getReposByUsername = (username) => {
  console.log('getReposByUsername: ', username);

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  const url = `https://api.github.com/users/${username}/repos`;
  let options = {
    per_page: 1,
    pages: 1,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  axios.get(url, options)
    .then((data) => {
      var dataArray = [];
      var data = data.data;
      for (let i = 0; i < data.length; i++) {
        var eachData = {
          id: data[i].id,
          name: data[i].name,
          owner: {
            login: data[i].owner.login,
            id: data[i].owner.id,
            url: data[i].owner.url,
            html_url: data[i].html_url
          },
          html_url: data[i].html_url,
          url: data[i].url,
          description: data[i].description,
          forks_count: data[i].forks_count,
          watchers: data[i].watchers
        }
        dataArray.push(eachData);
      }
      return dataArray
    })
    .then((dataArray) => {
      console.log('saving to db')
      db.save(null, dataArray);
    })
};

let getTopRepos = (cb) => {
  console.log('getTopRepos');
  //create 'watchers' empty array
  var watchers = [];
  //create 'topRepos' empty array
  var topRepos = [];
  //create 'length', null
  var length;
  //find all repos from database
  db.query(null, null, (response) => {
    console.log('query response')
    var parsedData = []
    for (let elem of response) {
      if (elem?.owner?.id)
        parsedData.push(elem._doc);
    }
    parsedData.sort((a, b) => (a.watchers > b.watchers) ? 1 : -1);
    length = parsedData.length <= 25 ? parsedData.length : 25;
    // console.log('parsedData.length: ', parsedData.length);
    // console.log('length: ', length);
    var iterations = parsedData.length - length;
    for (let i = 0; i < iterations; i++) {
      parsedData.shift();
    }
    cb(parsedData);
  })
};

//   response.forEach((elem) => {
//     if (elem.watchers !== undefined) {
//       watchers.push(elem.watchers);
//     }
//   })
//   watchers.sort((a,b) => a - b);
//   length = watchers.length > 25 ? 25 : watchers.length;
//   for (let i = 0; i < length; i++) {

//     topRepos.push();
//   }
//   cb(topRepos);
// })



//iterate all repos, push 'watchers' property to 'watchers' array
//sort 'watchers' (descending order)
//if watchers.length > 25, assign 'length' as 25, else assign as watchers.length
//iterate watchers from 0 -> 'length'
//push watchers[i] to topRepos
// }

module.exports.getReposByUsername = getReposByUsername;
module.exports.getTopRepos = getTopRepos;