import React, { Component } from "react";
import '../Header/Header.css';

export default class Header extends Component {

    constructor() {
        super();
        this.logout = this.logout.bind(this);
    }

    isAgent = () => {
        if (localStorage.getItem('type')==='agent') {
            return true;
        }
        return false
    }

    gotoListAllPOs = () => {
        window.location.href = `/${localStorage.getItem('type')}/listpos`;
    }

    gotoListAllParts = () => {
        window.location.href = `/${localStorage.getItem('type')}/listparts`;
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
        const clientMenus = (
            <>
            </>
        )
        const agentMenus = (            
            <>
            <button className="btn greeting">
                Logged Agent: {localStorage.getItem('username')}
            </button>
            <button className="btn btn-primary btn-block appmenu" onClick={this.gotoListAllParts}>
                List Parts
            </button>
            <button className="btn btn-primary btn-block appmenu" onClick={this.gotoListAllPOs}>
                List POs
            </button>
            </>
        )
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
            {this.isAgent() ?  agentMenus : clientMenus}
            {this.isLoggedIn() ?  logoutBtn : null}

            </>
        );
    }
}