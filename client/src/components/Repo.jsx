import React from 'react';

const Repo = ({ repo }) => (
  <ul>
    <a href={repo.html_url}>{repo.name}</a>
    <li>Repository Owner: {repo.owner.login}</li>
    <li>Repository Description: {repo.description}</li>
    <li>Watchers: {repo.watchers}</li>
    <li>Forks: {repo.forks_count}</li>
    <li>Weighted 'Top' Score: {repo.forks_count * 4 + repo.watchers}</li>
  </ul>
);


export default Repo;