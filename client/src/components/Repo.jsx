import React from 'react';

const Repo = ({ repo }) => {
  console.log(repo);
  return (
    <ul>
      <li>Repository Owner: {repo.owner.login}</li>
      <li>Repository name: {repo.name}</li>
      <li>Watchers: {repo.watchers}</li>
      <a href={repo.url}>{repo.url}</a>
    </ul>
  );
}

export default Repo;