import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import moment, { updateLocale } from 'moment';
import axios from 'axios'

import AddForm from './AddForm';
import EditForm from './EditForm';
import DeleteForm from './DeleteForm';
import './Main.css';
// import { DATA } from './init-data';
import loader from '../img/money-loader.gif';
// import loader from '../img/loading.gif';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleLeft, faAngleRight, faCheck, faWindowClose, faPlus, faMinus, faMoneyBillAlt, faCreditCard, faTrashAlt, faShekelSign, faDollarSign, faEuroSign, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(faAngleLeft, faAngleRight, faCheck, faWindowClose, faPlus, faMinus, faMoneyBillAlt, faCreditCard, faTrashAlt, faShekelSign, faDollarSign, faEuroSign, faEdit);

const ITEMSPERPAGE = 10

class Main extends Component {
  constructor() {
    super()
    this.fields = ["Date", "Type", "Category", "Method", "Amount", "Currency", "Comments"]
    this.currencyIcon = { "NIS": "shekel-sign", "EUR": "euro-sign", "USD": "dollar-sign" }
    this.state = {
      isLoading: true,
      allRecords: "",
      records: [],
      textTosearch: "",
      startDate: "",
      endDate: "",
      currentPage: 1,
      showAddForm: false,
      recordIdToEdit: -1, // if -1 nothing to edit,
      recordIdToDelete: -1 // if -1 nothing to delete
    }
  }

  componentDidMount() {
    this.getDataFromDB();
  }

  getCategories() {
    axios.get(`http://localhost:5001/categories`)
      .then(result => {
        console.log(result);
        // this.setState({allRecords:result.data[0].record});
        // this.setState({isLoading: false})
      })
  }

  getDataFromDB() {
    let userId = 1;//this.props.id;
    axios.get(`http://localhost:5001/getData/${userId}`)
      .then(result => {
        console.log(result.data[0].record);
        this.setState({ allRecords: result.data[0].record });
        this.setState({ isLoading: false })
      })
  }

  changeInput = (event) => this.setState({
    [event.target.name]: event.target.value
  })

  changePage = (action) => {
    let currentPage = this.state.currentPage
    action === "plus" ? currentPage++ : currentPage--
    this.setState({ currentPage })
  }

  /******Show Components *****/
  showLoader = () => this.state.isLoading ? <div className="loading"> <img src={loader} /></div> : null

  showNavBar = () =>
    <ul id="nav-bar">
      <li><Link to="/"><span>Records</span></Link></li>
      <li><Link to="/statistics"><span>Statistics</span></Link></li>
    </ul>

  showHeader = () => <div id="grid-header">
    {this.fields.map((f, i) => <div key={i}>{f}</div>)}
  </div>

  showSearchBar = () => <div className="search-bar">
    From: <input type="date" name="startDate" value={this.state.startDate} onChange={this.changeInput}></input><span> </span>
    To: <input type="date" name="endDate" value={this.state.endDate} onChange={this.changeInput}></input><span> </span>
    <input type="text" placeholder="Search" name="textTosearch" value={this.state.textTosearch} onChange={this.changeInput}></input>
    <FontAwesomeIcon onClick={() => this.showAddForm()} icon="plus" />
  </div>

  showPagination = (startIndex, endIndex, lastPage) =>
    <div className="pagination">
      {this.state.currentPage !== 1 ? <FontAwesomeIcon onClick={(e) => this.changePage("minus")} icon="angle-left" size="1x" /> : null}
      <span> </span> {startIndex} - {endIndex} <span> </span>
      {this.state.currentPage !== lastPage ? <FontAwesomeIcon onClick={() => this.changePage("plus")} icon="angle-right" size="1x" /> : null}
    </div>

  showAddForm = () => {
    this.setState({ showAddForm: true })
  }

  closeAddForm = () => this.setState({ showAddForm: false })
  closeEditForm = () => this.setState({ recordIdToEdit: -1 })
  closeDeleteForm = () => this.setState({ recordIdToDelete: -1 })

  /***** Get Record Components */
  getCurrentRecords = () => {
    let records = [...this.state.allRecords]
    let startIndex = (this.state.currentPage - 1) * ITEMSPERPAGE
    let endIndex = startIndex + ITEMSPERPAGE - 1
    records = records.filter(c =>
      (c["comment"].toLowerCase().includes(this.state.textTosearch.toLowerCase()))
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
          <div className="item" key={c.id}>
            <div>{date}</div>
            <div>{(c.type) ? <FontAwesomeIcon icon="minus" /> : <FontAwesomeIcon icon="plus" />}</div>
            <div>{c.category.name}</div>
            <div>{c.paymentMethod.name === "cash" ? <FontAwesomeIcon icon="money-bill-alt" /> : <FontAwesomeIcon icon="credit-card" />} </div>
            <div>{c.amount}</div>
            <div><FontAwesomeIcon icon={this.currencyIcon[c.currency]} /></div>
            <div>{c.comment}</div>
            <div>
              <FontAwesomeIcon icon="trash-alt" onClick={() => this.deleteRecord(c.id)} /> 
              <span> </span> 
              <FontAwesomeIcon icon="edit" onClick={() => this.editRecord(c.id)} /> 
            </div>
          </div>)
      })}
    </div>

  editRecord = (id) => {
    this.setState({recordIdToEdit: id})
  }

  deleteRecord = (id) => {
    this.setState({recordIdToDelete: id})
  }

  render() {
    let { records, startIndex, endIndex, lastPage } = this.getCurrentRecords()
    return (
      <div>
        <div className="App">
          {this.showNavBar()}
          <div className="container">
            <div className="row-bar">
              {this.showSearchBar()}
              {this.showPagination(startIndex, endIndex, lastPage)}
            </div>
            {this.renderRecords(records)}
            {this.state.showAddForm ? <AddForm closeAddForm={this.closeAddForm} /> : null}
            {(this.state.recordIdToEdit !== -1) ? <EditForm closeEditForm={this.closeEditForm} /> : null}
            {(this.state.recordIdToDelete !== -1) ? <DeleteForm closeEditForm={this.closeDeleteForm} /> : null}
            {this.showLoader()}
          </div>
          <button type="button" onClick={this.getCategories}>getData</button>
        </div>
        <div className="dot"> <FontAwesomeIcon size='6x' onClick={() => this.showAddForm()} icon="plus" /></div>
      </div>
    )
  }
}

export default Main;
