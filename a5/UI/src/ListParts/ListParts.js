import React, { Component } from "react";
import Axios from 'axios';
import '../ListParts/ListParts.css';

export default class ListParts extends Component {

    constructor() {
        super();
        this.state = {clientId:'', parts: [] }; //if clientId is empty display login error
        this.getParts = this.getParts.bind(this);
    }

    //Make the Web Service Call
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

    render() {
        // List all the parts 
        const parts = this.getParts();
        console.log(parts);
        let allParts = this.state.parts.map(part => {
                return(
                    <div className="parts">
                            <h4>Part Number: {part.partNoG4}</h4>
                            <p>Part Name: {part.partNameG4}</p>
                            <p>Part Description: {part.partDescriptionG4}</p>
                            <p>Price: {part.currentPriceG4}</p>
                            <p>Min Ordered Qty: {part.minQtyG4}</p>
                            <p>Part Description: {part.partDescriptionG4}</p>
                            <p>Reorder: {part.reorderG4} (if reorder is 1, it means the product is not avaiable at this point)</p>
                            <label for="quantity">Quantity can be Ordered: between {part.minQtyG4} and {part.qtyG4}</label>          
                    </div>
         )});    

         //overall layout
         return (
                <div id="output-values" className="median-values" >
                    <h3>Products</h3>
                    {allParts}
                </div>         
         );
        }



}
