import React, { Component } from "react";
import { Form, Button, DropdownButton, Dropdown } from "react-bootstrap";
import Axios from 'axios';
import './AgentUpdatePart.css'

export default class UpdatePart extends Component {

    constructor() {
        super();
        this.state = { 
            username: localStorage.getItem('username'), 
            usertype: localStorage.getItem('type'), 
            selPartNoG4: localStorage.getItem('partNoG4'),
            selPart: [],
            toQty: '',
            toPrice: '',
            statusText: '',
            loaded: false
        };
        this.submitPart = this.submitPart.bind(this);
        this.goToList = this.goToList.bind(this);
    }

    //Load the existing data for the part.
    async componentDidMount() {
        let ep = `/parts/${this.state.selPartNoG4}`;   
        const response = await Axios.get(ep).then((response) => {
            if(response.data != null){            
                this.setState({
                    selPart: response.data,
                    toPrice: response.data.currentPriceG4,
                    toQty: response.data.qtyG4,
                    loaded: true
                });
            }
            }).catch((err) => {
                alert(err);
            });
    }

    //Move to the parts List
    goToList= (poNoG4) => {
        window.location.href = "/agent/listparts";
    }

    //Set the updated quantity to the state variable
    qtyChange = (event) => {        
        this.setState({ toQty: event.target.value, statusText:''});
    }

     //Set the updated price to the state variable
    priceChange = (event) => {
        this.setState({ toPrice: event.target.value, statusText:''});
    }

    //Submit the updated price and quantity information to the database.
    submitPart = async (event) => {

        //Prevent the automatically triggered change submission to DB.
        event.preventDefault()

        //Error checking for new Price and new Quantity.
        if(isNaN(this.state.toPrice) || isNaN(this.state.toQty) ){
            this.setState({
                statusText: 'The given price or quantity is not a number.'
            });
            return;
        }else if(this.state.toPrice ==='' || this.state.toQty ===''){
            this.setState({
                statusText: 'Price or Quantity is empty. Please enter both.'
            });
            return;
        }else if(this.state.toPrice <=0 || this.state.toQty <=0){
            this.setState({
                statusText: 'Price and Quantity should be positive numbers.'
            });
            return;
        }

        //If all were filled out and valid (validated above), then submit the changes to the DB.
        if(this.state.toPrice !=='' && this.state.toQty !==''){

            //Call the patch web service for the specific part for the update of price and quantity.
            const response = await Axios.patch(`/agent/parts/${this.state.selPartNoG4}/priceqty`, 
                        {currentPriceG4: parseFloat(this.state.toPrice), qtyG4: parseInt(this.state.toQty)});

            console.log('results from api', response);

            //Using the resturned results, update the viewed detailed information of the part shown in UI.
            if(response.data != null && response.data[0][0].partNoG4 != null){

                if (response.status === 200) {
                    this.setState({
                        selPart: response.data[0][0],
                        toPrice: response.data[0][0].currentPriceG4,
                        toQty: response.data[0][0].qtyG4,
                        loaded: true,
                        statusText: 'Price and Quantity are updated.'
                    })
                } else {
                    // If not successful, show the failed results to the user.
                    this.setState({
                        statusText: 'An error occurred while updating part price and quantity.'
                    })
                }                
            }
        }
    }

    //UI Layout
    render() {

        let needReorder = (this.state.selPart.reorderG4 ===1)? "Yes": "No";
 
        return (
        <div className="update-container">
                <h2>Change Part Price and Quantity</h2>                
                <Form>
                    <ul>
                        <li>Part No: {this.state.selPart.partNoG4}</li>
                        <li>Part Name: {this.state.selPart.partNameG4}</li>
                        <li>Description: {this.state.selPart.partDescriptionG4}</li>                        
                        <li>Current Price: ${this.state.selPart.currentPriceG4}</li>
                        <li>Current Quantity: {this.state.selPart.qtyG4}</li>
                        <li>Need to re-order? {needReorder} (reorder criteria quantity: {this.state.selPart.minQtyG4})</li>
                    </ul>
                    <b>Enter new price and quantity and click Submit Change button.</b>            
                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" placeholder="New Price" value={this.state.toPrice} onChange={this.priceChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="number" placeholder="New Quantity" value={this.state.toQty} onChange={this.qtyChange}/>
                    </Form.Group>
                    <div className="update-btn-status">
                    <Button disabled={this.state.loaded === false} variant="primary" type="submit" onClick={this.submitPart}>
                        Submit Change
                    </Button>
                    <p className="update-statusText">{this.state.statusText}</p>
                    </div>
 
                </Form>
                <Button variant="info" onClick={this.goToList}>
                        Return to Parts List
                </Button>
            </div>
        )
    }

}