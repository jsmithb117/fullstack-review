import React from 'react';
import Repo from './Repo.jsx';

const RepoList = ({ repos }) => {
  // const repos = props.repos.map((repo) => {
  //   return <div>{repo}</div>
  // });
  return (
    <div>
      <h4> Repo List Component </h4>
      There are {repos.length} repos.
      <span>
      {repos.map((repo) => <Repo repo={repo} key={repo.id}/>)}
      </span>
    </div>
  )
}

export default RepoList;