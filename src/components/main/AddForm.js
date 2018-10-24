import React, { Component } from 'react';
import './AddForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class AddForm extends Component {
  constructor() {
    super()
    this.state = {
      date: "",
      type: "",
      category: "",
      method: "",
      amount: "",
      currency: "",
      comment: ""
    }
  }

  inputChange = (e) => {
     this.setState({[e.target.name] : e.target.value});
  }

  add = () => {
      this.props.updateClients(this.state, this.props.id)
  }

  render() {
    return <div className="add-form">
      <FontAwesomeIcon onClick={this.props.closeAddForm} icon="window-close" />
      <div className="add-form-input">
        <div>Name:</div><div><input value={this.state.name} onChange={this.inputChange}></input></div>
        <div>Surname:</div><div><input value={this.state.surname} onChange={this.inputChange}></input></div>
        <div>Country:</div><div><input value={this.state.country} onChange={this.inputChange}></input></div>
        <div>Country:</div><div><input value={this.state.country} onChange={this.inputChange}></input></div>
        <div>Country:</div><div><input value={this.state.country} onChange={this.inputChange}></input></div>
        <div>Country:</div><div><input value={this.state.country} onChange={this.inputChange}></input></div>
        <div>Country:</div><div><input value={this.state.country} onChange={this.inputChange}></input></div>
      </div>
      <button id="add" onClick={this.add}>Add</button>
    </div>
  }
}

export default AddForm;
