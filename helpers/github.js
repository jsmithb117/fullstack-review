const axios = require('axios');
const config = require('../config.js');
const db = require('../database/index.js');

let getReposByUsername = (username) => {
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
    .then((APIresponse) => {
      var APIdataArray = [];
      var APIdata = APIresponse.data;
      for (let i = 0; i < APIdata.length; i++) {
        var eachData = {
          id: APIdata[i].id,
          name: APIdata[i].name,
          owner: {
            login: APIdata[i].owner.login,
            id: APIdata[i].owner.id,
            url: APIdata[i].owner.url,
            html_url: APIdata[i].html_url
          },
          html_url: APIdata[i].html_url,
          url: APIdata[i].url,
          description: APIdata[i].description,
          forks_count: APIdata[i].forks_count,
          watchers: APIdata[i].watchers
        }
        APIdataArray.push(eachData);
      }
      return APIdataArray
    })
    .then((dataArray) => {
      db.save(null, dataArray);
    })
};

let getTopRepos = (cb) => {
  var watchers = [];
  var topRepos = [];
  var length;
  db.query(null, null, (response) => {
    var parsedData = []
    for (let elem of response) {
      if (elem?.owner?.id)
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