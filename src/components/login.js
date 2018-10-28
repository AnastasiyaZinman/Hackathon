import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactTimeout from 'react-timeout'
import { faGlobe, faUsdCircle} from '@fortawesome/free-solid-svg-icons'
import './home.css';
import { observer, inject } from 'mobx-react';
@inject("store")
@observer 
class LoginForm extends Component {
    constructor() {
        super()
        this.state = {
            redirectTo: null,
            username: '',
            password:''
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
    clear(){
        this.setState({username:'',password:''})
    }

    logIn = () => {
        //Send data to server via ajax
        // event.preventDefault()
        if (this.state.username && this.state.password){
        axios
            .post('/logIn', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => { 
                console.log("login",response);
                if (response.status === 200) {
                 
                   if(response.data!==false){
                        this.props.store.loggedIn = true;
                        this.props.store.id = response.data.id;
                        this.props.store.username = response.data.name;
                    this.setState({
                        redirectTo: '/main'
                    })
                }
                else{
                    // alert("wrong login or password");
                    this.props.store.errorMessage="wrong login or password";
                    this.props.store.showErrorMessage = true; 
                    this._showErrorMessage();
                    this.clear()
                }
                }
            })
        }
        else {
            this.props.store.errorMessage="Type name and password";
            this.props.store.showErrorMessage=true;
            this._showErrorMessage();
        }
            // .catch(error => {
            //     console.log('login error: ')
            //     console.log(error);
            // })
    }

    render() {
        //redirect by state
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div className="reg-box">
                {/* <form onSubmit={this.handleSubmit}> */}
                {/* <div className="row">
                    <div className="col-6">col</div>
                    <div className="col-6">col</div>
                </div> */}

                <FontAwesomeIcon style={{ color: "white" }} className="fas" icon={faGlobe} size="6x" />
               
                <h3 className="text-center">Log In</h3>
               <div className="row log">
               <div className="col-4 "> Name:</div>
               <div className="col-8">
               <input type="text" className="inp-reg" id="usernameLogIn" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} />
               </div></div>
               <div className="row pas">
               <div className="col-4 ">
                Password:</div>
                <div className="col-8">
                <input type="password" className="inp-reg" id="passwordLogIn" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} />
                </div> </div>
                
            <button className="button button-reg" onClick={this.logIn}><span>Log In</span></button>
            {(this.props.store.showErrorMessage)?<div className="error-message">{this.props.store.errorMessage}</div>:null}
          {/* <input type="submit" className="button button-reg" value="Log In" /> */}
           {/* </form>    */}
        </div>

        )
        }}
}

export default ReactTimeout(LoginForm)
