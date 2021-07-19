import React, { Component } from "react";
import Axios from 'axios';
import '../POdetail/POdetail.css';

export default class POdetail extends Component {

    constructor() {
        super();
        this.state = {clientId:'', poId:'', po: [], polines: [] };
        this.getPOdetails = this.getPOdetails.bind(this);
    }

    //Make the Web Service Calls
    getPOdetails = () => {

        //Get the PO Details
        let ep_po_details = '/client/pos/'+this.state.clientId+'/'+this.state.poId;        
        Axios.get(ep_po_details).then((response) => {
            if(response.data != null){
                this.setState({polines: response.data });

                //Get the PO Summary
                let ep_po_summary = '/client/pos/summary/'+this.state.clientId+'/'+this.state.poId;   
                Axios.get(ep_po_summary).then((response) => {
                    if(response.data != null){
                        this.setState({po: response.data });
                    }
                }).catch((err) => {
                    alert(err);
                });

            }
        }).catch((err) => {
            alert(err);
        });
    }

    //Handle Value Changes
    handleClientId = (event) => {
        this.setState({ clientId: event.target.value });
    }

    handlePoId = (event) => {
        this.setState({ poId: event.target.value });
    }

    //UI Layout
    render() {

        //PO Summary Box
        let posummary = this.state.po?.map((po, index)=>{
            return(
                <div className="order-summary" key={index}>
                    <b>Purchase Order Summary (PO ID: {po.poNoG4})</b>
                <ul>
                    <li>Client Company: {po.clientCompNameG4}</li>
                    <li>Order Status: {po.statusDescriptionG4}</li>
                    <li>Order Date/Time: {po.datePOG4}</li>
                    <li>Order Total Quantity: {po.totalQtyG4}</li>
                    <li>Order Total Price: ${po.totalPriceG4}</li>                    
                </ul>
            </div>
            )});

        //PO Detail Boxes
        let details = this.state.polines?.map((pl, index)=>{
        return(
            <div className="order-detail" key={index}>
                <b>Ordered Item (PO Line ID: {pl.partNoG4})</b>
                <ul>
                    <li>Part Name: {pl.partNameG4}</li>
                    <li>Quantity: {pl.qtyG4}</li>
                    <li>Price: ${pl.linePriceG4}</li>
                    <li>Current Status: {pl.statusDescriptionG4}</li>
                    <li>Submitted Date/Time: {pl.datePOG4}</li>
                </ul>
            </div>
        )});

        //Overall Layout
        return (
            <div>
                
                <div className="search-input">
             
                    <h3>Search PO</h3>

                    <div className="form-group">
                        <label>Client ID</label>
                        <input type="text" className="form-control" value={this.state.clientId}
                            onChange={this.handleClientId} placeholder="Enter client ID" />
                    </div>

                    <div className="form-group">
                        <label>PO ID</label>
                        <input type="text" className="form-control" value={this.state.poId}
                            onChange={this.handlePoId} placeholder="Enter PO ID" />
                    </div>

                    <div className="form-group">
                    <button id="submit-btn" onClick={() => this.getPOdetails()}>Display PO Details</button>
                    </div>                    
               
                </div>
                <div id="output-values" className="median-values" >
                    <h3>Purchase Order</h3>
                    {posummary}
                    <h3>Ordered Item Details</h3>
                    {details}
                </div>
            </div>
        );
    }
}