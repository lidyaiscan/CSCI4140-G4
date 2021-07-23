import React, { Component } from "react";
import Axios from 'axios';
import '../ClientListPOs/ClientListPOs.css';

export default class ClientListPOs extends Component {

    constructor() {
        super();
        this.state = {clientIdG4:localStorage.getItem('id'), poNoG4: '', posG4: [], clientInfoG4:{} };
        this.getClientInfoG4();
        this.getPOsG4 = this.getPOsG4.bind(this);
        this.getSpecificPOG4 = this.getSpecificPOG4.bind(this);
    }

    //** Make the Web Service Calls **//

    //Get the POs
    getPOsG4 = () => {

        //Get the POs
        let purchase_orders = '/client/pos/'+this.state.clientIdG4;    
        
        Axios.get(purchase_orders).then((response) => {
            if(response.data != null){
                this.setState({posG4: response.data });
            }
        }).catch((err) => {
            alert(err);
        });
    }

    getSpecificPOG4 = () => {

        //Validation
        if(this.state.poNoG4 === ''){
            alert('Invalid PO No. Please enter one of your valid PO IO numbers.');
        }else if(isNaN(this.state.poNoG4)){
                alert('Not a number. Please enter a valid number.');
        }else{

            //Get a PO
            let purchase_orders = '/client/pos/summary/'+this.state.clientIdG4+'/'+this.state.poNoG4;    
            
            Axios.get(purchase_orders).then((response) => {
                if(response.data != null){
                    this.setState({posG4: response.data });
                }
            }).catch((err) => {
                alert(err);
            });
        }
    }

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

    //Handle Value Changes
    handleClientIdG4 = (event) => {
        this.setState({ clientIdG4: event.target.value });
    }
    handlePoIdG4 = (event) => {
        this.setState({ poNoG4: event.target.value });
    }
    goToPOLineUIG4= (poNoG4) => {
        localStorage.setItem('poNoG4', poNoG4);
        window.location.href = "/client/podetail";
    }

    createNewPoLink = () => {
        window.location.href = '/client/create'
    }

    //UI Layout
    render() {

        //PO Summary Box
        let order = this.state.posG4?.map((po, index)=>{
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
            <button id="submit-btn" onClick={() => this.goToPOLineUIG4(po.poNoG4)}>View PO Line Details</button>
        </div>
        )});

        //Overall Layout
        return (
            <div>
                <div id="client-info" className="median-values" >
                    <h3>Hello, Client [{this.state.clientInfoG4.clientCompNameG4}]</h3>
                    <ul>
                        <li>City: {this.state.clientInfoG4.clientCityG4}</li>
                        <li>Money Owing: ${this.state.clientInfoG4.moneyOwedG4}</li>                   
                    </ul>
                </div>
                <div className="search-input">
             
                    <h4>Search Purchase Orders</h4>

                    <div className="form-group">
                    View All Orders <button id="submit-btn" onClick={() => this.getPOsG4()}>Display All</button>
                    </div>    
                    Or,<br />

                    <div className="form-group">
                    Search by a specific PO by No.
                        <input type="text" className="form-control" value={this.state.poNoG4}
                            onChange={this.handlePoIdG4} placeholder="Enter a PO No." />
                        <button id="submit-btn" onClick={() => this.getSpecificPOG4()}>Search</button>
                    </div>                  

                </div>
                <br />
                <div id="output-values" className="median-values" >
                    <h3>Purchase Orders</h3>
                <button className="btn btn-primary btn-block switch-button" onClick={this.createNewPoLink}>
                    Create New
                </button>
                    {order}
                </div>
                
                <br />
            </div>
        );
    }
}