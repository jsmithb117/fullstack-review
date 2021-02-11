import React from 'react';

const Repo = ({ repo }) => {
  return (
  <ul>
    <li>Repository Name: <a href={repo.html_url}>{repo.name}</a></li>
    <li>Repository Owner: {repo.owner}</li>
    <li>Repository Description: {repo.description}</li>
    <li>Watchers: {repo.watchers}</li>
    <li>Forks: {repo.forks_count}</li>
    <li>Weighted 'Top' Score: {repo.top}</li>
  </ul>
)};


export default Repo;