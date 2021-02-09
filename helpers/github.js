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


module.exports.getReposByUsername = getReposByUsername;