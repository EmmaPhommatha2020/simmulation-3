import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav/Nav';
import router from './route';
import { withRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        {
          this.props.location.pathname !== '/' ? <Nav /> : null
        }
        { router }
      </div>
    );
  }
}

export default withRouter(App);
