import React, { Component } from "react";
import Axios from 'axios';
import '../ListPOs/ListPOs.css';

export default class ListPOs extends Component {

    constructor() {
        super();
        this.state = {clientId:'', pos: [] };
        this.getPOs = this.getPOs.bind(this);
    }

    //Make the Web Service Call
    getPOs = () => {

        //Get the POs
        let purchase_orders = '/client/pos/'+this.state.clientId;        
        Axios.get(purchase_orders).then((response) => {
            if(response.data != null){
                this.setState({pos: response.data });
            }
        }).catch((err) => {
            alert(err);
        });
    }

    //Handle Value Changes
    handleClientId = (event) => {
        this.setState({ clientId: event.target.value });
    }

    //UI Layout
    render() {

        //PO Summary Box
        let order = this.state.pos?.map((po, index)=>{
        return(
            <div className="order" key={index}>
            <b>Purchase Order {po.poNoG4}</b>
            <ul>
                <li>Client Company: {po.clientCompNameG4}</li>
                <li>Order Status: {po.statusDescriptionG4}</li>
                <li>Order Date/Time: {po.datePOG4}</li>
                <li>Order Total Quantity: {po.TOTAL_QTY}</li>
                <li>Order Total Price: ${po.TOTAL_COST}</li>                    
            </ul>
        </div>
        )});

        //Overall Layout
        return (
            <div>
                
                <div className="search-input">
             
                    <h3>Search Client PO's</h3>

                    <div className="form-group">
                        <label>Client ID</label>
                        <input type="text" className="form-control" value={this.state.clientId}
                            onChange={this.handleClientId} placeholder="Enter client ID" />
                    </div>

                    <div className="form-group">
                    <button id="submit-btn" onClick={() => this.getPOs()}>Display PO's</button>
                    </div>                    
               
                </div>
                <div id="output-values" className="median-values" >
                    <h3>Purchase Orders</h3>
                    {order}
                </div>
            </div>
        );
    }
}