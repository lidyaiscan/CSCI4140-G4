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

    gotoSubmitPO = () => {
        window.location.href = `/client/create`;
    }

    gotoListAllPOs = () => {
        window.location.href = `/${localStorage.getItem('type')}/listpos`;
    }

    gotoListAllParts = () => {
        window.location.href = `/${localStorage.getItem('type')}/listparts`;
    }

    gotoListAllClients = () => {
        window.location.href = `/${localStorage.getItem('type')}/listclients`;
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
            <button className="btn greeting">
                Logged Client: {localStorage.getItem('username')}
            </button>            
            <button className="btn btn-primary btn-block appmenu" onClick={this.gotoListAllParts}>
                List Parts
            </button>
            <button className="btn btn-primary btn-block appmenu" onClick={this.gotoListAllPOs}>
                List POs
            </button>
            <button className="btn btn-primary btn-block appmenu" onClick={this.gotoSubmitPO}>
                Submit PO
            </button>
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
            <button className="btn btn-primary btn-block appmenu" onClick={this.gotoListAllClients}>
                List Clients
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
            {this.isLoggedIn() ?  this.isAgent() ?  agentMenus : clientMenus : null}
            {this.isLoggedIn() ?  logoutBtn : null}

            </>
        );
    }
}