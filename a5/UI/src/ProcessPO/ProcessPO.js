import React, { Component } from "react";
import Axios from 'axios';
import '../ProcessPO/ProcessPO.css';

export default class ProcessPO extends Component {

    constructor() {
        super();
        this.processPODetail = this.processPODetail.bind(this);
        this.state = {clientId:'', poId:'', po: [], poLines: [], commitPrompt: []};
    }

    //Make the Web Service Calls
    processPODetail = () => {

        //Get the PO Details
        let po_details = '/agent/pos/' + this.state.poId;
        console.log(this.state.poId);
        Axios.get(po_details).then((response) => {
            if(response.data != null){

                let idTemp = null;
                if (response.data.length) {
                    Object.keys(response.data).forEach(function(key) {
                        var row = response.data[key];
                        idTemp = row.clientCompIdG4;
                    });
                }

                this.setState({clientId: idTemp});

                //getclientAndPOInfo
                let client_PO_info = '/agent/pos/client/'+this.state.clientId+ '/' +this.state.poId;
                Axios.get(client_PO_info).then((response) => {
                    if(response.data != null){
                        this.setState({po: response.data });
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

        // start transaction for checking quantity
        let qty_check = '/agent/pos/checkqty/'+this.state.poId +'/CHECK';
        Axios.get(qty_check).then((response) => {
            if(response.data != null){
                this.setState({commitPrompt: response.data[0] });
            }
        }).catch((err) => {
            alert(err);
        });
    }

    //Handle Value Changes
    handlePoId = (event) => {
        this.setState({ poId: event.target.value });
    }

    cancel = (event) => {
        // start transaction for checking quantity
        let qty_check = '/agent/pos/checkqty/'+this.state.poId +'/ROLLBACK';
        Axios.get(qty_check).then((response) => {
            if(response.data != null){
                window.location.reload();
            }
        }).catch((err) => {
            alert(err);
        });
    }

    commit = (event) => {
        // start transaction for checking quantity
        let qty_check = '/agent/pos/checkqty/'+this.state.poId +'/COMMIT';
        Axios.get(qty_check).then((response) => {
            if(response.data != null){
                window.location.reload();
            }
        }).catch((err) => {
            alert(err);
        });
    }

    viewAllProducts = () => {
        window.location.href = '/listparts'
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
                        <li>Company's Money Owned: {po.moneyOwedG4}</li>
                        <li>Order Date: {po.datePOG4}</li>
                        <li>Order Status: {po.statusG4}</li>
                    </ul>
                </div>
            )});

        //PO line Boxes
        let details = this.state.poLines?.map((pl, index)=>{
            return(
                <div className="order-detail" key={index}>
                    <b>Ordered Item (PO Line ID: {pl.partNoG4})</b>
                    <ul>
                        <li>Part Name: {pl.partNameG4}</li>
                        <li>Quantity In Stock: {pl.partQtyG4}</li>
                        <li>Current Unit Price: ${pl.currentPriceG4}</li>
                        <li>Order Quantity: ${pl.POqtyG4}</li>
                        <li>Current Status: {pl.statusDescriptionG4}</li>
                        <li>Submitted Date/Time: {pl.datePOG4}</li>
                    </ul>
                </div>
            )});

        //PO line Boxes
        let window = this.state.commitPrompt?.map((pl, index)=>{

            if(pl["@COMMITPROMPT"] === 1){
                return(
                    <div className="prompt">
                        <b>The part(s) you ordered is(are) out of stock</b>
                    </div>
                )
            } else if(pl["@COMMITPROMPT"] === 0)
            return(
                <div className="order-detail" key={index}>
                    <b>Do you want to cancel or commit the transaction?</b>
                    <div className="form-group">
                        <button id="cancel-btn" onClick={() => this.cancel()}>cancel</button>
                    </div>
                    <div className="form-group">
                        <button id="commit-btn" onClick={() => this.commit()}>commit</button>
                    </div>
                </div>
            )
        });

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
                        <button id="submit-btn" onClick={() => this.processPODetail()}>Display PO Details</button>
                    </div>

                </div>
                <div id="output-values" className="median-values" >
                    <h3>Purchase Order</h3>
                    {poDetail}
                    <h3>Ordered Item Details</h3>
                    {details}
                    <h3>Actions</h3>
                    {window}
                    <button className="btn btn-primary btn-block switch-button"  onClick={this.viewAllProducts}>
                        View All Products
                    </button>
                </div>
            </div>
        );
    }
}