import React, { Component } from "react";
import Axios from 'axios';
import '../ClientListPOs/ClientListPOs.css';

export default class ClientListPOs extends Component {

    constructor() {
        super();
        this.state = {clientIdG4:localStorage.getItem('id'), poNoG4: '', posG4: [], clientInfoG4:{}, statusMsgG4:'' };
        this.getClientInfoG4();
        this.getPOsG4 = this.getPOsG4.bind(this);
        this.getSpecificPOG4 = this.getSpecificPOG4.bind(this);
        this.getPOsG4();
    }

    //** Make the Web Service Calls **//

    //Get the POs
    getPOsG4 = () => {

        //Get the POs
        let purchase_orders = '/client/pos/'+this.state.clientIdG4;    
        
        Axios.get(purchase_orders).then((response) => {
            if(response.data != null){
                this.setState({posG4: response.data, poNoG4:'', statusMsgG4:'' });
            }
        }).catch((err) => {
            console.log(err);
            this.state.statusMsgG4 = "Error Occurred";
        });
    }

    getSpecificPOG4 = () => {

        //Validation
        if(this.state.poNoG4 === ''){
            this.state.statusMsgG4 = 'Invalid PO No. Please enter a valid PO number.';
        }else if(isNaN(this.state.poNoG4)){
            this.state.statusMsgG4 = 'Not a number. Please enter a valid number.';
        }else{

            //Get a PO
            let purchase_orders = '/client/pos/summary/'+this.state.clientIdG4+'/'+this.state.poNoG4;    
            
            Axios.get(purchase_orders).then((response) => {
                if(response.data.length>0){
                    this.setState({posG4: response.data, statusMsgG4:'' });                    
                }else{
                    this.setState({posG4: [], statusMsgG4:'No Data. You can only search for orders of your company.'});
                }
            }).catch((err) => {
                console.log(err);
                this.state.statusMsgG4 = "Error Occurred";
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
            console.log(err);
            this.state.statusMsgG4 = "Error Occurred";
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
        this.state.statusMsgG4 = '';
        localStorage.setItem('poNoG4', poNoG4);
        window.location.href = "/client/podetail";
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
            <button className="btn btn-primary btn-block block-gap" onClick={() => this.goToPOLineUIG4(po.poNoG4)}>
                View PO Lines Detail
            </button>
        </div>
        )});

        //Overall Layout
        return (
            <div>
                <br />                
                <div id="output-values" className="median-values" >
                    <h2>{this.state.clientInfoG4.clientCompNameG4} Purchase Orders</h2>
                    <h6>Client {this.state.clientInfoG4.clientCompNameG4} ({this.state.clientInfoG4.clientCityG4}): Current Money Owing ${this.state.clientInfoG4.moneyOwedG4}</h6>
                    <br />
                    <div className="search-input">
             
                        <h5>Search</h5>
                        <div className="form-group">
                            Display all, or, Search by PO no.
                            <input type="text" className="form-control" value={this.state.poNoG4}
                                onChange={this.handlePoIdG4} placeholder="Enter a PO No." />

                            <button className="btn btn-primary btn-block block-gap-left" onClick={() => this.getPOsG4()}>
                                Display All
                            </button>
                            <button className="btn btn-primary btn-block block-gap-left" onClick={() => this.getSpecificPOG4()}>
                                Search
                            </button>

                            <div className="warning">{this.state.statusMsgG4}</div>
                        </div>                  

                </div>                
                <br />
                {order}
                </div>
            </div>
        );
    }
}