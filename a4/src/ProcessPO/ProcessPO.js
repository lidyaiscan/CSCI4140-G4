import React, { Component } from "react";
import Axios from 'axios';
import '../ProcessPO/ProcessPO.css';

export default class ProcessPO extends Component {

    constructor() {
        super();
        this.state = {clientId:'', poId:'', po: [], poLines: []};
        this.getPOdetails = this.getPOdetails.bind(this);
    }

    //Make the Web Service Calls
    getPOdetails = () => {

        //Get the PO Details
        let po_details = '/agent/pos/' + this.state.poId;
        Axios.get(po_details).then((response) => {
            if(response.data != null){

                if (response.data.length) {
                    Object.keys(response.data).forEach(function(key) {
                        var row = response.data[key];
                        this.setState({clientId: row.clientCompIdG4 });
                    });
                }

                const poTemp = response.data;

                //getclientInfo
                let client_info = '/clients/'+this.state.clientId;
                Axios.get(client_info).then((response) => {
                    if(response.data != null){
                        this.setState({po: poTemp + response.data });
                    }
                }).catch((err) => {
                    alert(err);
                });

                //Get the PO lines
                let po_lines = '/client/pos/'+this.state.clientId+'/'+this.state.poId;
                Axios.get(po_lines).then((response) => {
                    if(response.data != null){
                        this.setState({poLines: response.data });
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
    handlePoId = (event) => {
        this.setState({ poId: event.target.value });
    }

    //UI Layout
    render() {

        //PO Box
        let poDetail = this.state.po?.map((po, index)=>{
            return(
                <div className="order-summary" key={index}>
                    <b>Purchase Order Summary (PO ID: {po.poNoG4})</b>
                    <ul>
                        <li>Company Name: {po.clientCompNameG4}</li>
                        <li>Company Location: {po.clientCityG4}</li>
                        <li>Company's Money Owned: {po.moneyOwnedG4}</li>
                        <li>Order Date: {po.datePOG4}</li>
                        <li>Order Status: {po.statusG4}</li>
                    </ul>
                </div>
            )});

        //PO line Boxes
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

                    <h3>Process PO</h3>

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
                    {poDetail}
                    <h3>Ordered Item Details</h3>
                    {details}
                </div>
            </div>
        );
    }
}