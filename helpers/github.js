const axios = require('axios');
const config = require('../config.js');
const db = require('../database/index.js');

let getReposByUsername = (username) => {
  const url = `https://api.github.com/users/${username}/repos`;
  let options = {
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  axios.get(url, options)
    .then((APIresponse) => {
      var dataArray = [];
      var APIdata = APIresponse.data;
      for (let i = 0; i < APIdata.length; i++) {
        var eachData = {
          _id: APIdata[i].id,
          name: APIdata[i].name,
          html_url: APIdata[i].html_url,
          description: APIdata[i].description,
          forks_count: APIdata[i].forks_count,
          watchers: APIdata[i].watchers,
          owner: APIdata[i].owner.login
        }
        dataArray.push(eachData);
      }
      db.save(dataArray);
    })
    .catch((err) => {
      console.error('error getting API response: ', err);
    })
};

let getTopRepos = (cb) => {
  var watchers = [];
  var topRepos = [];
  var length;

  db.queryAll((response) => {
    var parsedData = []
    for (let elem of response) {
      if (elem._doc)
        parsedData.push(elem._doc);
    }
    parsedData.sort((a, b) => ((a.watchers + (a.forks_count * 4)) > (b.watchers + (b.forks_count * 4))) ? 1 : -1);
    length = parsedData.length <= 25 ? parsedData.length : 25;
    var iterations = parsedData.length - length;
    for (let i = 0; i < iterations; i++) {
      parsedData.shift();
    }
    cb(parsedData);
  })
};

module.exports.getReposByUsername = getReposByUsername;
module.exports.getTopRepos = getTopRepos;