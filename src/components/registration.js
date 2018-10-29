import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faUsdCircle} from '@fortawesome/free-solid-svg-icons'
import { observer, inject } from 'mobx-react';
import ReactTimeout from 'react-timeout'
import axios from 'axios';
import './home.css';
@inject("store")
@observer
class Registration extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: ''
        }
    }

      _showErrorMessage = () => {
        this.props.setTimeout(this.props.store.toggle, 5000) // call the `toggle` function after 5000ms
      }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    sendNewUserData = () => {
        
        console.log("send", this.state);
        if (this.state.username && this.state.password){
        axios.post('http://localhost:5001/addUser', this.state)
            .then(response => {
                if (response.status === 200) {
                    console.log("response", response);
                if(response.data.error){
                
                this.props.store.errorMessage="This name already exists";
                this.props.store.showErrorMessage = true; 
                this._showErrorMessage();
                }
                    else {
                        this.props.store.showErrorMessage = true;
                        this.props.store.errorMessage = "New login created";
                        this._showErrorMessage();
                    }
                
            }
            else console.log("error");
        })
            .catch(error => {
                console.log("error",error);
                
            })
        this.clearInputs();
        }
        else {
            this.props.store.errorMessage="Type name and password";
            this.props.store.showErrorMessage=true;
            this._showErrorMessage();
        }
    }


    clearInputs() {
        this.setState({ username: "", password: "" });
    }
    getRegistration() {
        return (
            <div className="reg-box">
                {/* <div className="row">
                    <div className="col-6">col</div>
                    <div className="col-6">col</div>
                </div> */}

                <FontAwesomeIcon style={{ color: "white" }} className="fas" icon={faGlobe} size="6x" />
               
                <h3 className="text-center">Sign Up</h3>
               <div className="row log">
               <div className="col-4 "> Name:</div>
               <div className="col-8">
                <input className="inp-reg" type="text" id="username" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} />
               </div></div>
               <div className="row pas">
               <div className="col-4 ">
                Password:</div>
                <div className="col-8">
                 <input className="inp-reg" type="password" id="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
               </div> </div>
               
            <button className="button button-reg" onClick={this.sendNewUserData}><span>Sign Up</span></button>
              {(this.props.store.showErrorMessage)?<div className="error-message">{this.props.store.errorMessage}</div>:null}
            </div>)
    }

    render() {
        return (
            <div>
                {this.getRegistration()}
            </div>
        )

    }
}

export default ReactTimeout(Registration)
