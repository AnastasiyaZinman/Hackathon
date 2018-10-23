import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class LoginForm extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            redirectTo: null
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        //Send data to server via ajax
        event.preventDefault()
        axios
            .post('http://localhost:5001/logIn', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                if (response.status === 200) {
                  console.log("login",response);
                    // localStorage.setItem("token", JSON.stringify(response.data.token));
                    // this.props.updateUser({
                    //     loggedIn: true,
                    //     username: JSON.parse(response.config.data).username
                    // })
                    // this.setState({
                    //     redirectTo: '/mainDashBoard'
                    // })
                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error);
            })
    }

    render() {
        //redirect by state
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div>
                    <h4>Login</h4>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Name:
                            <input type="text" type="text" id="usernameLogIn" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} />
                        </label>
                        <label>
                            password:
                            <input type="password" type="password" id="passwordLogIn" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            )
        }
    }
}

export default LoginForm
