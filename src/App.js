import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom'
// import { observer, inject } from 'mobx-react';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom'
import Main from './components/main/Main'
import LoginForm from './components/login'
import Navbar from './components/navbar'
import Home from './components/home'
import Registration from './components/registration'


class App extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      id: -1,
      password: '',
      loggedIn: false 
    } 
  }
  updateUser =(obj) =>{
    this.setState({
    loggedIn: obj.loggedIn,
    id: obj.id,
    username: obj.username
})
} 
  render() {
    return (
      <Router>
      <div className="App">
        <div className="title t-font"></div>
        <Navbar logout={this.logout} loggedIn={this.state.loggedIn} />  
        <Route exact path="/" component={Home} />
        <Route path="/signup" render={() => <Registration updateUser={this.updateUser} />}/>
        <Route path="/login" render={() => <LoginForm updateUser={this.updateUser}/>}/>
        <Route path="/main" render={() => <Main logout={this.logout} loggedIn={this.state.loggedIn} id={this.state.id}/>}/> 
      </div>
      </Router>
    );
  }
}

export default App;
