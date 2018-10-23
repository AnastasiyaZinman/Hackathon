import React, { Component } from 'react';
// import { observer, inject } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
// import axios from 'axios';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import axios from 'axios';


class App extends Component {
  constructor() {
    super()
    this.state = {
        username: '',
        password: ''
    }
}
handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    })
}
sendNewUserData = () => {

  console.log(this.state)
}
  
  clearInputs() {
    this.setState({ username: "", password: "" });
}
getInputs() {
    return (<div>
        <h2>Registration</h2>
        <FontAwesomeIcon style={{ color: "blue" }} className="fas" icon={faGlobe} size="6x" />
        <br />
        <label>
            Name:
    <input type="text" type="text" id="username" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} />
        </label><br />
        <label>
            password:
    <input type="password" type="password" id="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} />
        </label>
        <button type="button" onClick={this.sendNewUserData}>Registration</button>
    </div>)
}
 
  render() {
    return (
      <div className="App">
        <div className="title t-font">Log In</div>
                {this.getInputs()}
        {/* {this.props.store.addChildBox ?
       <AddChild id={this.props.store.currentIdForAddChild} /> : null } */}
      </div>
    );
  }
}

export default App;
