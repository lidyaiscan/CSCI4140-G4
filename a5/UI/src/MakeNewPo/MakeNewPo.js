import React, { Component } from "react";
import axios from 'axios';
import '../MakeNewPo/MakeNewPo.css';

export default class MakeNewPo extends Component {

    constructor() {
        super();
        this.state = {parts: [], clientNo: '', part1No:'', part1Qty:'', iforderplaced:''};
        this.getParts = this.getParts.bind(this);
        this.placeOrder = this.placeOrder.bind(this);
    }

    //Make the Web Service Calls to get all parts
    getParts = () => {

        //Get the PO Details
        let parts = '/parts';        
        axios.get(parts).then((response) => {
            if(response.data != null){
                this.setState({parts: response.data });
            }
        }).catch((err) => {
            alert(err);
        });
    }

    //Handle Value Changes
    placeOrder = async (event) => {
        event.preventDefault();
        try {
            axios.patch(`/client/createPo/:clientCompIdG4/${this.state.clientNo}`, {
                partNoG4: this.state.part1No,
                qtyG4: this.state.part1Qty
              })

              this.setState({
                status: 'Order has been placed successfully'
            })
            //This part should valide the current user
              
          } catch (error) {
            this.setState({
                status: 'There is some issue with the curret order.'
            }, () => alert(error))
          }

    }
    handleClientNo = (event) => {
        this.setState({ clientNo: event.target.value });
    }
    handlePart1No = (event) => {
        this.setState({ part1No: event.target.value });
    }
    handlePart1Qty = (event) => {
        this.setState({ part1Qty: event.target.value });
    }

    

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
                            <p>Min Ordered Qty: {part.minQtyG4}</p>
                            <p>Part Description: {part.partDescriptionG4}</p>
                            <p>Reorder: {part.reorderG4} (if reorder is 1, it means the product is not avaiable at this point)</p>
                            <label for="quantity">Quantity (between {part.minQtyG4} and {part.qtyG4})</label>          
                    </div>
         )});    

         //overall layout
         return (
            <div>
                <div>
                    <form onSubmit={this.placeOrder}>
                        <h2>Order Request:</h2>
                        <div>
                            <label>Client No:</label>
                            <input type = "number" min = '0' value={this.state.clientNo}
                                onChange={this.handleClientNo}  />
                        </div>
                        <div>
                            <h4>Iterm 1:</h4>
                            <div>
                                <label>partNo:</label>
                                <input type = "number" min = '0' value={this.state.part1No}
                                    onChange={this.handlePart1No}  />
                            </div>
                            <br></br>
                            <div>
                                <label>Quantity:</label>
                                <input type = "number" min = '0' value={this.state.part1Qty}
                                    onChange={this.handlePart1Qty}  />
                            </div>       
                        </div>
                        <br></br>
                        <input type="submit"  value="Place this order" />
                    </form>
                </div>
                <div id="output-values" className="median-values" >
                    <h3>Products</h3>
                    {allParts}
                </div>
                
            </div>
            

         );
        }

}

