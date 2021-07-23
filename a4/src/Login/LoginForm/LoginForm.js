import React, { Component } from "react";
import axios from 'axios';
import '../Login.css'
export default class LoginForm extends Component {

    constructor() {
        super();
        this.state = { username: '', password: '', status: '' };
        this.loginUser = this.loginUser.bind(this);
        this.validate = this.validate.bind(this);
        this.resetStatus = this.resetStatus.bind(this);
    }

    componentDidMount() {
        // TO-DO: Check for type and redirect to the proper page based on that

        const type = localStorage.getItem('type');

        if (type === 'agent') {
            window.location.href = "/processpo";
        } else if (type === 'client') {
            window.location.href = '/client/listpos'
        }
    }

    loginUser = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`/authenticate/${this.props.type}`, {
                username: this.state.username,
                password: this.state.password
              })

              this.setState({
                status: ''
            })
    
              if (response.status === 200) {
                localStorage.setItem('username', this.state.username);
                localStorage.setItem('type', this.props.type);
                // localStorage.setItem('id')
                if (this.props.type === 'agent') {
                    window.location.href = "/processpo";
                }
                if (this.props.type === 'client') {
                    localStorage.setItem('id', response.data[0].clientCompIdG4);
                    window.location.href = "/client/listpos";
                }
            }
          } catch (error) {
            this.setState({
                status: 'Login failed.'
            }, () => alert(error))
          }

    }

    handleUserName = (event) => {
        this.setState({ username: event.target.value });
    }

    handlePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    resetStatus = () => {
        this.setState({
            status: ''
        })
    }

    validate = () => {
      const { username, password } = this.state;

        if (!username || !password) {
            return true;
        }

        return false;
    }
    render() {
        return (
            <>
            <div className="container">
                {this.props.type === 'client' ? <h1>Client Login</h1> : <h1>Agent Login</h1>}
                <form onSubmit={this.loginUser}>
                    <div className="form-group login-control">
                        <label>Username</label>
                        <input className="form-control" value={this.state.username}
                            onChange={this.handleUserName} placeholder="Enter username" />
                    </div>

                    <div className="form-group login-control">
                        <label>Password</label>
                        <input type="password" className="form-control" value={this.state.password}
                            onChange={this.handlePassword} placeholder="Enter password" />
                    </div>
                    <p className="login-status">{this.state.status}</p>
                    <input disabled={this.validate()} type="submit" className="btn btn-primary btn-block login-button" value="Login" />
                </form>
            </div>
            </>
        );
    }
}