import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom'
// import { observer, inject } from 'mobx-react';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Link } from 'react-router-dom'
import LoginForm from './components/login'
import Navbar from './components/navbar'
import Home from './components/home'
import Registration from './components/registration'


class App extends Component {
  constructor() {
    super()
    this.state={
    
    }
  }
  render() {
    return (
      <div className="App">
        <div className="title t-font"></div>
      <LoginForm />
      <Registration />
      </div>
    );
  }
}

export default App;
