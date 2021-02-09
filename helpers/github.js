const axios = require('axios');
const config = require('../config.js');


let getReposByUsername = (username) => {

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  const url = `https://api.github.com/users/${username}/repos`;
  let options = {
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  axios.get(url, options)
  .then((data) => {
    console.log('from axios')
    console.log(data);
  })
}

module.exports.getReposByUsername = getReposByUsername;