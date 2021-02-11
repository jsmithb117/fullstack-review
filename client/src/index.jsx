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

  componentDidMount() {
    const url = 'http://localhost:1128/repos';
    fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((jsonData) => {
        this.setState({ repos: jsonData })
      })
      .catch((err) => {
        console.log('componentDidMount error');
        console.error(err);
      })
  }

  search(term) {
    const url = 'http://localhost:1128/repos';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: term })
    }
    fetch(url, options)
      .catch((err) => {
        if (err) { console.error(err) }
      })
  };

  render() {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} />
      <Search onSearch={this.search.bind(this)} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));