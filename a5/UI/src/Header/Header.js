import React, { Component } from "react";

export default class Header extends Component {

    constructor() {
        super();
        this.logout = this.logout.bind(this);
    }

    logout = () => {
        localStorage.clear()
        window.location.href = "/";
    }

    isLoggedIn = () => {
        if (localStorage.getItem('type')) {
            return true;
        }
        return false
    }

    render() {
        const logoutBtn = (
            <div className="logout-button-container">
                <button className="btn btn-primary btn-block logout-button" onClick={this.logout}>
                    Logout
                </button>
            </div>
        )
        return (
            <>
            <div className="header-title-container"><h1>CSCI4140 G4 A4</h1></div>
            {this.isLoggedIn() ?  logoutBtn : null}

            </>
        );
    }
}