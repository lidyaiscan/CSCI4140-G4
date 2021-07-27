import React, { Component } from "react";
import { Form, Button, DropdownButton, Dropdown } from "react-bootstrap";
import axios from 'axios'
import './ClientCreatePO.css'

export default class ClientCreatePO extends Component {

    constructor() {
        super();
        this.state = { id: localStorage.getItem('id'), type: 'client', parts: [], loaded: false, selectedId: 0, selectedTitle: 'Select a Part', selectedQty: 0, partsAry: [], apiRequest: [], statusText: '' };
        this.addPart = this.addPart.bind(this)
        this.goBack = this.goBack.bind(this)
    }

    async componentDidMount() {
        const response = await axios.get('/parts');
            if(response.data != null){
                this.setState({
                    parts: response.data,
                    loaded: true
                });
            }
    }

    switchType = () => {
        let type = 'agent'

        if (this.state.type === 'agent') {
            type = 'client'
        }

        this.setState({
            type: type
        })

        this.ClientCreatePOFormElement.current.resetStatus();
    }

    submitPo = async (event) => {
        event.preventDefault();

        const response = await axios.patch(`/client/createpowithdetails/${this.state.id}`, this.state.apiRequest);
        console.log('results from api', response)

        if (response.status === 200) {
            this.setState({
                statusText: 'Purchase order placed.'
            })
        } else {
            this.setState({
                statusText: 'An error occurred while placing your order.'
            })
        }

    }

    addPart = () => {
        const newPart = {
            partNoG4: this.state.selectedId,
            title: this.state.selectedTitle,
            qty: parseInt(this.state.selectedQty)
        }
        const newPartApi = {
            partNoG4: this.state.selectedId,
            qtyG4: parseInt(this.state.selectedQty)
        }

        this.setState(prevState => ({
            partsAry: [...prevState.partsAry, newPart],
            apiRequest: [...prevState.apiRequest, newPartApi],
            statusText: 'Part added.'
          }))
    }

    handleSelect = (id, title, qty) =>{
        this.setState({
            selectedId: id,
            selectedTitle: title,
        })
      }

    handleQty = (event) => {
        this.setState({ selectedQty: event.target.value });
    }

    goBack = () => {
        window.location.href = "/client/listpos";
    }

    clear = () => {
        this.setState({
            partsAry: [],
            apiRequest: [],
            statusText: 'Cleared PO.'
        })
    }


    render() {

        let partsSelector = null;
        let poList = null;

        if (this.state.loaded) {
            partsSelector = (
                <DropdownButton id="dropdown-basic-button" title={this.state.selectedTitle}>
                    {this.state.parts.map((p) => {
                    return <Dropdown.Item onSelect={() => this.handleSelect(p.partNoG4, p.partNameG4, this.state.selectedQty)} eventKey={p.partNoG4}>{`${p.partNoG4} - ${p.partNameG4}`}</Dropdown.Item>
                })}
                </DropdownButton>
            )

            poList = (
                this.state.partsAry.map((p) => {
                   return <li class="list-group-item">{`${p.qty}x ${p.title}`}</li>
                })
            )
        }


        return (
            <>
            <div className="create-container">
                <h2>Create a New Purchase Order</h2>
                <Form>
                    <Form.Group className="mb-3" controlId="formPart">
                        {partsSelector}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="number" placeholder="Quantity" onChange={this.handleQty}/>
                    </Form.Group>
                    <div className="create-btn-container">
                    <div className="create-po-controls">
                    <Button disabled={this.state.selectedTitle === "Select a Part" || this.state.selectedQty < 1} className="addPartBtn" variant="btn btn-success" onClick={this.addPart}>
                        Add Part to PO
                    </Button>
                    <Button disabled={this.state.selectedQty < 1} className="addPartBtn create-clear-btn" variant="btn btn-warning" onClick={this.clear}>
                        Clear PO
                    </Button>
                    </div>
                    <div className='create-list-container'>
                        {poList}
                    </div>
                    <Button disabled={this.state.apiRequest.length < 1} variant="primary" type="submit" onClick={this.submitPo}>
                        Submit
                    </Button>
                    <p className="create-statusText">{this.state.statusText}</p>
                    </div>
 
                </Form>
                <Button variant="info" onClick={this.goBack}>
                        Return to PO View
                    </Button>
            </div>
            
            </>
        );
    }
}