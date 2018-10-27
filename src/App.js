import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom'
import { observer, inject } from 'mobx-react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom'
import Main from './components/main/Main'
import LoginForm from './components/login'
import Navbar from './components/navbar'
import Home from './components/home'
import Registration from './components/registration'

@inject("store")
@observer
class App extends Component {
  constructor() {
    super()
    // this.state = {
    //   username: '',
    //   id: -1,
    //   password: '',
    //   loggedIn: false 
    // } 
  }
//   updateUser = (obj) =>{
//     this.props.store.loggedIn = obj.loggedIn,
//     this.props.store.id = obj.id,
//     this.props.store.username = obj.username
// } 
  render() {
    return (
      <Router>
      <div className="App">
        <div className="title t-font"></div>
        <Navbar logout={this.props.store.logout} />  
        <Route exact path="/" component={Home} />
        <Route path="/signup" render={() => <Registration />}/>
        <Route path="/login" render={() => <LoginForm />}/>
        <Route path="/main" render={() => <Main logout={this.props.store.logout} loggedIn={this.props.store.loggedIn} id={this.props.store.id}/>}/> 
      </div>
      </Router>
    );
  }
}

export default App;
