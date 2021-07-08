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

        Axios.get('http://localhost:8080/getAllOrders').then((response) => {
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
                            <p>{element.companyName}</p>
                            <p>{element.productName}</p>
                            <p>{element.billAmount}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}