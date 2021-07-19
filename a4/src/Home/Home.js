import React, { Component } from "react";
import Axios from 'axios';
import '../Home/Home.css';

export default class Home extends Component {

    constructor() {
        super();
        this.state = { orders: [] };
        this.getOrders = this.getOrders.bind(this);
    }

    getOrders = () => {

        //FYI - Below endpoint was updated to prevent CORS issue. 
        //      You can change your port (e.g. 8000, 8080) in package.json ("proxy": "http://localhost:8000").
        Axios.get('/parts').then((response) => {
            this.setState({ orders: response.data });
        }).catch((err) => {
            alert(err);
        });
    }

    render() {
        return (
            <div>
                <div className="input-form">
                    <button id="submit-btn" onClick={() => this.getOrders()}>Get Orders</button>
                </div>
                <div id="output-values" className="median-values">
                    {this.state.orders.map((element, index) => (
                        <div className="values" key={index}>
                            <p>{element.partNoG4}</p>
                            <p>{element.partNoG4}</p>
                            <p>{element.partNoG4}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}