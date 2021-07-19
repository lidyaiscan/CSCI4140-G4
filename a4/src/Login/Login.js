import React, { Component } from "react";
import Axios from 'axios';

export default class Login extends Component {

    constructor() {
        super();
        this.state = { userName: '', password: '' };
        this.loginUser = this.loginUser.bind(this);
    }

    loginUser = (event) => {

        event.preventDefault();

        //FYI - Below endpoint was updated to prevent CORS issue. 
        //      You can change your port (e.g. 8000, 8080) in package.json ("proxy": "http://localhost:8000").
        Axios.get('/parts', {
            'userName': this.state.userName,
            'password': this.state.password
        }).then(function (response) {
            if (response.status === 200) {
                window.location.href = "/home";
            }
        }).catch(function (error) {
            alert(error);
        });

    }

    handleUserName = (event) => {
        this.setState({ userName: event.target.value });
    }

    handlePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.loginUser}>
                    <h3>Sign In</h3>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" value={this.state.userName}
                            onChange={this.handleUserName} placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" value={this.state.password}
                            onChange={this.handlePassword} placeholder="Enter password" />
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>

                    <input type="submit" className="btn btn-primary btn-block" value="Login" />
                </form>
            </div>
        );
    }
}