import React, { Component } from "react";
import Axios from 'axios';
import '../AgentListPOs/AgentListPOs.css';

export default class AgentListPOs extends Component {

    constructor() {
        super();
        this.state = {agentIdG4:localStorage.getItem('id'), agentName: localStorage.getItem('username'), poNoG4: '', posG4: [], statusMsg:'' };
        this.getPOsG4 = this.getPOsG4.bind(this);
        this.getSpecificPOG4 = this.getSpecificPOG4.bind(this);
    }

    //** Make the Web Service Calls **//

    //Get the POs
    getPOsG4 = () => {

        //Get the POs
        let all_pos = '/agent/pos/';    
        
        Axios.get(all_pos).then((response) => {
            if(response.data != null){
                this.setState({posG4: response.data, statusMsg:'' });
            }
        }).catch((err) => {
            this.state.statusMsg = err;
        });
    }

    getSpecificPOG4 = () => {

        //Validation
        if(this.state.poNoG4 === ''){
            this.state.statusMsg = 'Invalid PO No. Please enter one of your valid PO IO numbers.';
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
                alert(err);
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
            <b>Purchase Order {po.poNoG4}</b>
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
            <div>
                <div id="client-info" className="median-values" >
                    <h3>Hello, Agent <i>{this.state.agentName}</i></h3>    
                </div>
                <div className="search-input">
             
                    <h4>Search Purchase Orders</h4>

                    <div className="form-group">
                    View All Orders 

                    <button className="btn btn-primary btn-block block-gap-left" onClick={() => this.getPOsG4()}>
                        Display All
                    </button>

                    </div>    
                    Or,<br />

                    <div className="form-group">
                    Search by a specific PO by No.
                        <input type="text" className="form-control" value={this.state.poNoG4}
                            onChange={this.handlePoIdG4} placeholder="Enter a PO No." />

                        <button className="btn btn-primary btn-block block-gap-left" onClick={() => this.getSpecificPOG4()}>
                        Search
                        </button>

                        <div className="warning">{this.state.statusMsg}</div>
                    </div>                  

                </div>
                <br />
                <div id="output-values" className="median-values" >
                    <h3>Purchase Orders</h3>
                    {order}
                </div>
                
                <br />
            </div>
        );
    }
}