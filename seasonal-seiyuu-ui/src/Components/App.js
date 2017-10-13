import React, { Component } from 'react';
import MainUI from './MainUI'; 
import './App.css';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props); 
  }

  render() {
    document.title = "Seasonal Seiyuu";
    return (
      <Router>
        <Route path="/" component={MainUI}/>
      </Router>
    );
  }
}

export default App;
