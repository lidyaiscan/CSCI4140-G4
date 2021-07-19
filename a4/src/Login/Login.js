import React, { Component } from "react";
import './Login.css'
import LoginForm from "./LoginForm/LoginForm";

export default class Login extends Component {

    constructor() {
        super();
        this.state = { username: '', password: '', type: 'client' };
        this.switchType = this.switchType.bind(this);
        this.loginFormElement = React.createRef();
    }

    switchType = () => {
        let type = 'agent'

        if (this.state.type === 'agent') {
            type = 'client'
        }

        this.setState({
            type: type
        })

        this.loginFormElement.current.resetStatus();
    }

    handleUserName = (event) => {
        this.setState({ username: event.target.value });
    }

    handlePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    render() {
        return (
            <>
            <div className="container login-container">
                <h3>Sign In</h3>
                <button className="btn btn-primary btn-block switch-button" onClick={this.switchType}>
                    Switch User Type
                </button>
                <LoginForm ref={this.loginFormElement} type={this.state.type}/>
            </div>
            </>
        );
    }
}