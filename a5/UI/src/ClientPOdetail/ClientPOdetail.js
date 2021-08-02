import React, { Component } from "react";
import Axios from 'axios';
import '../ClientPOdetail/ClientPOdetail.css';

export default class ClientPOdetail extends Component {

    constructor() {
        super();
        this.state = {clientIdG4:localStorage.getItem('id'), poIdG4:localStorage.getItem('poNoG4'), clientInfoG4:{}, poG4: [], polinesG4: [] };
        this.getClientInfoG4();
        this.getPOdetailsG4();
    }

    //** Make the Web Service Calls **//
    //Get the PO Details and PO Summary
    getPOdetailsG4 = () => {

        //Get the PO Details
        let ep_po_details = '/client/pos/'+this.state.clientIdG4+'/'+this.state.poIdG4;        
        Axios.get(ep_po_details).then((response) => {
            if(response.data != null){
                this.setState({polinesG4: response.data });

                //Get the PO Summary
                let ep_po_summary = '/client/pos/summary/'+this.state.clientIdG4+'/'+this.state.poIdG4;   
                Axios.get(ep_po_summary).then((response) => {
                    if(response.data != null){
                        this.setState({poG4: response.data });
                    }
                }).catch((err) => {
                    alert(err);
                });

            }
        }).catch((err) => {
            alert(err);
        });
    }

    // Client Info Summary
    getClientInfoG4 = () => {

        //Get the client's info
        let client_info = '/clients/'+this.state.clientIdG4;  
        
        Axios.get(client_info).then((response) => {
            if(response.data != null){
                this.setState({clientInfoG4: response.data });
            }
        }).catch((err) => {
            alert(err);
        });
    }

    //Go back to the PO List
    goToPOListUIG4 = () =>{
        localStorage.setItem('poNoG4', '');
        window.location.href = "/client/listpos";
    }

    //UI Layout
    render() {

        //PO Summary Box
        let posummary = this.state.poG4?.map((po, index)=>{
            return(
                <div className="order-summary" key={index}>
                    <b>Purchase Order</b> (PO No. {po.poNoG4})
                <ul>
                    <li>Client Company: {po.clientCompNameG4}</li>                    
                    <li>Order Total Quantity: {po.TOTAL_QTY}</li>
                    <li>Order Total Price: ${po.TOTAL_COST}</li>
                    <li>Order Status: {po.statusDescriptionG4}</li>
                    <li>Ordered (Date/Time): {po.datePOG4}</li>                  
                </ul>
            </div>
            )});

        //PO Detail Boxes
        let details = this.state.polinesG4?.map((pl, index)=>{
        return(
            <div className="order-detail" key={index}>
                <b>Part Name: {pl.partNameG4}</b> (PO Line No. {pl.partNoG4}, Part No. {pl.partNoG4})
                <ul>
                    <li>Quantity: {pl.POqtyG4}</li>
                    <li>Price: ${pl.linePriceG4}</li>
                    <li>Current Status: {pl.statusDescriptionG4}</li>
                    <li>Submitted (Date/Time): {pl.datePOG4}</li>
                </ul>
            </div>
        )});

        //Overall Layout
        return (
            <div>
                <br />
                <div id="client-info" className="median-values" >
                    <h5>The detail of Purchase Order (No. {this.state.poIdG4})</h5>
                    <ul>
                        <li>Client Name: {this.state.clientInfoG4.clientCompNameG4}</li>
                        <li>City: {this.state.clientInfoG4.clientCityG4}</li>
                        <li>Client Money Owing: ${this.state.clientInfoG4.moneyOwedG4}</li>                   
                    </ul>                    
                </div>
                <div id="output-values" className="median-values" >
                    <h4>Purchase Order Summary</h4>
                    {posummary}
                    <h4>Ordered Parts</h4>
                    {details}
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