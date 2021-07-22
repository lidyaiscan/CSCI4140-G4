import React, { Component } from "react";
import Axios from 'axios';
import '../MakeNewPo/MakeNewPo.css';

export default class MakeNewPo extends Component {

    constructor() {
        super();
        this.state = {parts: [] };
        this.getParts = this.getParts.bind(this);
    }

    //Make the Web Service Calls to get all parts
    getParts = () => {

        //Get the PO Details
        let parts = '/parts';        
        Axios.get(parts).then((response) => {
            if(response.data != null){
                this.setState({parts: response.data });
            }
        }).catch((err) => {
            alert(err);
        });
    }

    //Handle Value Changes
    //not sure what I need to set for this part yet
    /*
    handleClientId = (event) => {
        this.setState({ clientId: event.target.value });
    }

    handlePoId = (event) => {
        this.setState({ poId: event.target.value });
    }
    */

    //UI Layout
    render() {
        // List all the parts 
        const parts = this.getParts();
        console.log(parts);
        let allParts = this.state.parts.map(part => {
                return(
                    <div id = "products-details">
                            <h4>Part Number: {part.partNoG4}</h4>
                            <p>Part Name: {part.partNameG4}</p>
                            <p>Part Description: {part.partDescriptionG4}</p>
                            <p>Price: {part.currentPriceG4}</p>
                    </div>
         )});    

         //overall layout
         return (
            <div>
                <div id="output-values" className="median-values" >
                    <h3>Products</h3>
                    {allParts}
                </div>
            </div>
         );
        }

}

