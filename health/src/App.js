import React, { Component } from 'react';
import './App.css';
import Home from './Home'

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <img src={ require('./images/hospita.jfif') } /> */}
        <Home />
      </div>
    );
  }
}

export default App;
