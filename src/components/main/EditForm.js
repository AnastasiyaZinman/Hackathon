import React, { Component } from 'react';
import './AddForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class EditForm extends Component {
  constructor() {
    super()
    this.categoriesExpense = ["rent", "clothes", "food", "books"];
    this.categoriesIncome = ["salary", "freelance"];
    this.currencies = ["NIS", "USD", "EUR"]
    this.state = {
      date: "",
      type: "Expense",
      category: "",
      method: "Cash",
      amount: "",
      currency: "",
      comment: ""
    }
  }

  inputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="add-form">
        <div className="close-button"><FontAwesomeIcon onClick={this.props.closeEditForm} icon="window-close" /></div>
        <div>EDIT</div>
        <div className="add-form-input">
          <div className="one-column" onChange={this.inputChange} name="type">
            <div> Expense <input type="radio" checked={this.state.type === "Expense"} onChange={this.inputChange} value="Expense" name="type" /> </div><span> </span>
            <div> Income <input type="radio" checked={this.state.type === "Income"} onChange={this.inputChange} value="Income" name="type" /> </div>
          </div>
          <div className="one-column" onChange={this.inputChange} name="method">
            <div> Cash <input type="radio" checked={this.state.method === "Cash"} onChange={this.inputChange} value="Cash" name="method" /> </div><span> </span>
            <div> Card <input type="radio" checked={this.state.method === "Card"} onChange={this.inputChange} value="Card" name="method" /> </div>
          </div>
          <div> Date:</div><div> <input name="date" type="date" value={this.state.date} onChange={this.inputChange} /></div>
          <div> Category: </div>

          <div className="sel"> <select name="category" value={this.state.category} onChange={this.inputChange} >
            {this.categoriesExpense.map((cat, i) =>
              <option key={i} value={cat}>{cat}</option>
            )};
          </select></div>

          <div> Amount</div><div> <input type="number" name="amount" value={this.state.amount} onChange={this.inputChange} /> </div>
          <div> Currency: </div>
          <div className="sel"> <select name="currency" value={this.state.currency} onChange={this.inputChange} >
            {this.currencies.map((cat, i) =>
              <option key={i} value={cat}>{cat}</option>
            )};
          </select></div>
          <div> Comment</div><div> <input type="text" name="comment" value={this.state.comment} onChange={this.inputChange} /> </div>
        </div>
        <div>
          <button>Send</button>
        </div>
      </div>
    )
  }
}

export default EditForm;

