import React, { Component } from "react";
import Axios from 'axios';
import '../AgentListPOs/AgentListPOs.css';

export default class AgentListPOs extends Component {

    constructor() {
        super();
        this.state = {agentIdG4:localStorage.getItem('id'), agentName: localStorage.getItem('username'), poNoG4: '', posG4: [], statusMsg:'' };
        this.getPOsG4 = this.getPOsG4.bind(this);
        this.getSpecificPOG4 = this.getSpecificPOG4.bind(this);
        this.getPOsG4();
    }

    //** Make the Web Service Calls **//

    //Get the POs
    getPOsG4 = () => {

        //Get the POs
        let all_pos = '/agent/posaggr';    
        
        Axios.get(all_pos).then((response) => {
            if(response.data != null){
                this.setState({posG4: response.data, poNoG4:'', statusMsg:'' });
            }
        }).catch((err) => {
            console.log(err);
            this.state.statusMsg = "Error Occurred";
        });
    }

    getSpecificPOG4 = () => {

        //Validation
        if(this.state.poNoG4 === ''){
            this.state.statusMsg = 'Invalid PO No. Please enter a valid PO ID.';
        }else if(isNaN(this.state.poNoG4)){
            this.state.statusMsg = 'Not a number. Please enter a valid number.';
        }else{

            //Get a PO
            let a_po = '/agent/pos/summary/'+this.state.poNoG4;    
            
            Axios.get(a_po).then((response) => {
                if(response.data.length>0){
                    this.setState({posG4: response.data, statusMsg:'' });                    
                }else{
                    this.setState({posG4: [], statusMsg:'No Data'});
                }
            }).catch((err) => {
                console.log(err);
                this.state.statusMsg = "Error Occurred";
            });
        }
    }

    //Handle Value Changes
    handlePoIdG4 = (event) => {
        this.setState({ poNoG4: event.target.value });
    }
    goToPOLineUIG4= (poNoG4) => {
        this.state.statusMsg = '';
        localStorage.setItem('poNoG4', poNoG4);
        window.location.href = "/agent/podetail";
    }
    startProcessPO= (poNoG4) => {
        this.state.statusMsg = '';
        localStorage.setItem('poNoG4', poNoG4);
        window.location.href = "/agent/processpo";
    }
    //UI Layout
    render() {

        //PO Summary Box
        let order = this.state.posG4?.map((po, index)=>{
        return(
            <div className="order" key={index}>
            <b>Purchase Order</b> (No. {po.poNoG4})
            <ul>
                <li>Client Company: {po.clientCompNameG4}</li>
                <li>Order Status: {po.statusDescriptionG4}</li>
                <li>Order Date/Time: {po.datePOG4}</li>
                <li>Order Total Quantity: {po.TOTAL_QTY}</li>
                <li>Order Total Price: ${po.TOTAL_COST}</li>                    
            </ul>
            <button className="btn btn-primary btn-block block-gap" onClick={() => this.goToPOLineUIG4(po.poNoG4)}>
                View PO Line Details
            </button>
            <button className="btn btn-primary btn-block" onClick={() => this.startProcessPO(po.poNoG4)}>
                Process this PO
            </button>
        </div>
        )});

        //Overall Layout
        return (
            <>
                <div>
                    <div id="output-values" className="median-values" >
                        <h3>Purchase Orders</h3>                    
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

                                <div className="warning">{this.state.statusMsg}</div>
                            </div>                  

                        </div>
                        <br />
                        {order}
                    </div>
                </div>
            </> 
        );
    }
}