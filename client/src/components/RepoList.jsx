import React from 'react';
import Repo from './Repo.jsx';

const RepoList = ({ repos }) => {
  return (
    <div>
      <h4> Repo List Component </h4>
      There are {repos.length} repos.
      <span>
        {repos.map((repo) => <Repo repo={repo} key={repo.repoId} />)}
      </span>
    </div>
  )
}

export default RepoList;