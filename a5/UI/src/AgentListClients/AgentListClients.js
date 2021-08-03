import React, { Component } from "react";
import Axios from 'axios';
import '../AgentListClients/AgentListClients.css';

export default class AgentListClients extends Component {

    constructor() {
        super();
        this.state = {agentIdG4:localStorage.getItem('id'), agentNameG4: localStorage.getItem('username'), clientsG4: []};
        this.getClientsG4 = this.getClientsG4.bind(this);
        this.getClientsG4();
    }

    //Make the Web Service Call
    getClientsG4 = () => {
        //Get the Client Details
        let clients = '/agent/listclients';        
        Axios.get(clients).then((response) => {
            if(response.data != null){
                this.setState({clientsG4: response.data});
            }
        }).catch((err) => {
            alert(err);
        });
    }

    render() {

        // List all the clients 
        let allClients = this.state.clientsG4?.map(client => {
            return(
                <div className="clients">
                    <h4>Client Number: {client.clientCompIdG4}</h4>
                    <p>Client Company Name: {client.clientCompNameG4}</p>
                    <p>Client Location: {client.clientCityG4}</p>
                    <p>Client Money Owing: ${client.moneyOwedG4}</p>    
                </div>
         )});    

         //overall layout
         return (
             <>            
                <div id="output-values" className="median-values" >
                    <h2>Clients</h2>
                    <br />
                    {allClients}
                </div> 
            </>        
         );
        }

}
