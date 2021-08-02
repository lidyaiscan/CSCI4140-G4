import React, { Component } from "react";
import Axios from 'axios';
import '../AgentProcessPO/AgentProcessPO.css';

export default class AgentProcessPO extends Component {

    constructor() {
        super();
        this.state = {agentIdG4:localStorage.getItem('id'), agentName: localStorage.getItem('username'), 
                        poIdG4:localStorage.getItem('poNoG4'), clientIdG4:'', clientInfoG4:{}, poG4: [], polinesG4: [] };
        this.getPOdetailsG4();
    }

    //** Make the Web Service Calls **//
    //Get the PO Details and PO Summary
    getPOdetailsG4 = () => {

        //Get the PO Details
        let po_lines = '/agent/poparts/'+this.state.poIdG4;       
        Axios.get(po_lines).then((response) => {
            if(response.data != null){
                this.setState({
                    polinesG4: response.data, 
                    clientIdG4: response.data[0].clientCompIdG4
                });

               //getclientAndPOInfo
               // Get the PO Summary with client's owing amount and location
               let client_and_PO_info = '/agent/pos/client/' +this.state.poIdG4;
                Axios.get(client_and_PO_info).then((response) => {
                    if(response.data != null){
                        this.setState({
                            poG4: response.data                            
                        });

                        // Client Info Summary
                        let client_info = '/clients/'+this.state.clientIdG4;  
                        
                        Axios.get(client_info).then((response) => {
                            if(response.data != null){
                                this.setState({clientInfoG4: response.data });
                            }
                        }).catch((err) => {
                            alert(err);
                        });

                        // Start transaction for checking quantity
                        let qty_check = '/agent/pos/checkqty/'+this.state.poIdG4 +'/CHECK';
                        Axios.get(qty_check).then((response) => {
                            if(response.data != null){
                                this.setState({commitPrompt: response.data[0] });
                            }
                        }).catch((err) => {
                            alert(err);
                        });
                        
                    }
                }).catch((err) => {
                    alert(err);
                });

            }
        }).catch((err) => {
            alert(err);
        });
    }

    //Go back to the PO List
    goToPOListUIG4 = () =>{
        localStorage.setItem('poNoG4', '');
        window.location.href = "/agent/listpos";
    }

    //Processing Functions
    cancel = (event) => {
        // start transaction for checking quantity
        let qty_check = '/agent/pos/checkqty/'+this.state.poIdG4 +'/ROLLBACK';
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
        let qty_check = '/agent/pos/checkqty/'+this.state.poIdG4 +'/COMMIT';
        Axios.get(qty_check).then((response) => {
            if(response.data != null){
                window.location.reload();
            }
        }).catch((err) => {
            alert(err);
        });
    }

    //UI Layout
    render() {

        //Processing Info & Results
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

                        <button className="btn btn-primary btn-block block-gap" onClick={() => this.cancel()}>
                        Cancel
                        </button>

                    </div>
                    <div className="form-group">

                        <button className="btn btn-primary btn-block block-gap" onClick={() => this.commit()}>
                        Commit
                        </button>
                    </div>
                </div>
            )
        });

        //PO Summary Box
        let poDetail = this.state.poG4?.map((po, index)=>{
            return(
                <div className="order-summary" key={index}>
                    <b>Purchase Order Summary (PO ID: {po.poNoG4})</b>
                    <ul>
                        <li>Company Name: {po.clientCompNameG4}</li>
                        <li>Company Location: {po.clientCityG4}</li>
                        <li>Company's Money Owed: {po.moneyOwedG4}</li>
                        <li>Order Date: {po.datePOG4}</li>
                        <li>Order Status: {po.statusG4}</li>
                    </ul>
                </div>
            )});

        //PO line detail Boxes
        let linesDetail = this.state.polinesG4?.map((pl, index)=>{
            return(
                <div className="order-detail" key={index}>
                    <b>Ordered Item (PO Line ID: {pl.partNoG4})</b>
                    <ul>
                        <li>Part Name: {pl.partNameG4}</li>
                        <li>Quantity In Stock: {pl.partQtyG4}</li>
                        <li>Current Unit Price: ${pl.currentPriceG4}</li>
                        <li>Order Quantity: {pl.POqtyG4}</li>
                        <li>Current Status: {pl.statusDescriptionG4}</li>
                        <li>Submitted Date/Time: {pl.datePOG4}</li>
                    </ul>
                </div>
            )});

        //Overall Layout
        return (
            <div>
                <br />
                <div id="client-info" className="median-values" >
                    <h4>Hello, Agent <i>{this.state.agentName}</i></h4>    
                    <h3>Processing the Purchase Order (No. {this.state.poIdG4}) submitted by {this.state.clientInfoG4.clientCompNameG4}</h3>                
                    <ul>
                        <li>Client Name: {this.state.clientInfoG4.clientCompNameG4}</li>
                        <li>City: {this.state.clientInfoG4.clientCityG4}</li>
                        <li>Client Money Owing: ${this.state.clientInfoG4.moneyOwedG4}</li>                   
                    </ul>                       
                </div>
                <hr/>
                <div id="client-info" className="median-values" >
                    <h3>Processing Info and Actions</h3>
                    <br />
                    {window}
                    <br />
                </div>
                <hr/>
                <div id="output-values" className="median-values" >
                    <h5>Purchase Order</h5>
                    {poDetail}
                    <h5>Ordered Item Details</h5>
                    {linesDetail}
                    <div>
                        <button className="btn btn-primary btn-block block-gap" onClick={() => this.goToPOListUIG4()}>
                        Back to the PO List
                        </button>

                        <br /><br />
                    </div>
                </div>
                <br />                
            </div>
        );
    }
}