import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  search (term) {
    // console.log(`${term} was searched`);
    const searchTerm = JSON.stringify(term);
    const url = 'http://localhost:1128/repos';
    const options = {
      method: 'POST',
      body: searchTerm
    }
    fetch(url, options)
    .then((data) => {
      console.log('data: ', data);
    })
  };

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));