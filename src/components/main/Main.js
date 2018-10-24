import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import moment, { updateLocale } from 'moment';

import AddForm from './AddForm';
import './Main.css';
import { DATA } from './init-data';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleLeft, faAngleRight, faCheck, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(faAngleLeft, faAngleRight, faCheck, faWindowClose);

const ITEMSPERPAGE = 15

class Main extends Component {
  constructor() {
    super()
    this.fields = ["Date", "Type", "Category", "Method", "Amount", "Currency", "Comments"]
    this.state = {
      allRecords: DATA,
      records: [],
      textTosearch: "",
      searchType: "comment",
      startDate: "",
      endDate: "",
      currentPage: 1,
      showAddForm: false
      //recordToChange: -1 // id of the record to change in popup form or -1 if none
    }
  }

  changeInput = (event) => this.setState({
    [event.target.name]: event.target.value
  })

  changePage = (action) => {
    let currentPage = this.state.currentPage
    action === "plus" ? currentPage++ : currentPage--
    this.setState({ currentPage })
  }

  add = () => {
    this.setState ({ showAddForm: true })
  }
  /*
  editName = (id) => {
    let showUpdatePopup = !this.state.showUpdatePopup
    this.setState({ showUpdatePopup, recordToChange: id })
  }

  updateRecords = (state, id) => {
    let records = this.state.allRecords
    let index = records.findIndex(c => c._id === id)
    records[index].name = state.name + " " + state.surname
    records[index].country = state.country
    this.setState({ allRecords: records, showUpdatePopup: false })
  }

  closeUpdatePopup = () => this.setState({ showUpdatePopup: false })
  */

  showHeader = () => <div id="grid-header">
    {this.fields.map((f, i) => <div key={i}>{f}</div>)}
  </div>

  showSearchBar = () => <div className="search-bar">
    From: <input type="date" name="startDate" value={this.state.startDate} onChange={this.changeInput}></input><span> </span>
    To: <input type="date" name="endDate" value={this.state.endDate} onChange={this.changeInput}></input><span> </span>
    <input type="text" placeholder="Search" name="textTosearch" value={this.state.textTosearch} onChange={this.changeInput}></input>
  </div>

  // Pagination and search bar
  showPagination = (startIndex, endIndex, lastPage) =>
    <div className="pagination">
      {this.state.currentPage !== 1 ? <FontAwesomeIcon onClick={(e) => this.changePage("minus")} icon="angle-left" size="1x" /> : null}
      <span> </span> {startIndex} - {endIndex} <span> </span>
      {this.state.currentPage !== lastPage ? <FontAwesomeIcon onClick={() => this.changePage("plus")} icon="angle-right" size="1x" /> : null}
    </div>

  showNavBar = () =>
    <ul id="nav-bar">
      <li><Link to="/"><span>Records</span></Link></li>
      <li><Link to="/statistics"><span>Statistics</span></Link></li>
      <li onClick={() => this.add()}><span>Add new</span></li>
    </ul>

  getCurrentRecords = () => {
    let searchType = this.state.searchType.toLowerCase()
    let records = [...this.state.allRecords]
    let startIndex = (this.state.currentPage - 1) * ITEMSPERPAGE
    let endIndex = startIndex + ITEMSPERPAGE - 1
    records = records.filter(c =>
      (c[searchType].toLowerCase().includes(this.state.textTosearch.toLowerCase()))
      && (c.date >= this.state.startDate || this.state.startDate === "")
      && (c.date <= this.state.endDate || this.state.endDate === "")
    )
    let lastPage = Math.ceil(records.length / ITEMSPERPAGE)
    records = records.slice(startIndex, endIndex + 1)
    return { records, startIndex, endIndex, lastPage }
  }

  renderRecords = (records) =>
  <div id="grid-container">
    {this.showHeader()}
    {records.map(c => {
      let date = moment(c.date).format("MM/DD/YY")
      return (
        <div className="item" key={c.id} onClick={() => this.editName(c.id)}>
          <div>{date}</div>
          <div>{c.type}</div>
          <div>{c.categoryId}</div>
          <div>{c.paymentMethodId}</div>
          <div>{c.amount}</div>
          <div>{c.currency}</div>
          <div>{c.comment}</div>
        </div>)
    })}
  </div>

  render() {
    let { records, startIndex, endIndex, lastPage } = this.getCurrentRecords()
    console.log(records)
    return (
      <div className="App">
        {this.showNavBar()}
        <div className="container">
          <div className="row-bar">
            {this.showSearchBar()}
            {this.showPagination(startIndex, endIndex, lastPage)}
          </div>
          {this.renderRecords(records)}
          {this.state.showAddForm ? <AddForm/> : null}
        </div>
      </div>
    )
  }
}

export default Main;
