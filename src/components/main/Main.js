import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import moment, { updateLocale } from 'moment';
import axios from 'axios'
import AddForm from './AddForm';
import './Main.css';
// import { DATA } from './init-data';
import loader from '../img/money-loader.gif';
// import loader from '../img/loading.gif';


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
      isLoading: true,
      allRecords: "",
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
 
  componentDidMount() {
    this.getDataFromDB();
  }

  getDataFromDB() {
    let userId=1;//this.props.id;
    axios.get(`http://localhost:5001/getData/${userId}`)
			.then(result => {
				console.log(result.data[0].record);
        this.setState({allRecords:result.data[0].record});
        this.setState({isLoading: false})
    })
    .catch(function (error) {
      alert("Sorry, something wrong. Can't get data from DB.");
      console.log(error);
    });
  }

  getRequests(link){
    axios.get(`http://localhost:5001/${link}`)
			.then(result => {
				console.log(result);
        // this.setState({allRecords:result.data[0].record});
		})
  }
  putRequests(link, data){
    axios.put(`http://localhost:5001/${link}`, data, {
        headers: {
            'Content-Type': 'application/json',
        }}
    )
    .then(response => {
      console.log("data from DB",response);
      // this.addNewClientToState(response.data)
    })
    .catch(function (error) {
      // alert("Sorry, something wrong. New client haven't added.");
      console.log(error);
    });
    console.log("Added to DB")
  }
  postRequests(data, link){
    // let data = {name:"business", type:0, Icon:"faGlobe"};
    axios.post(`http://localhost:5001/${link}`, data, {
        headers: {
            'Content-Type': 'application/json',
        }}
    )
    .then(response => {
      console.log("data from DB",response);
      // this.addNewClientToState(response.data)
    })
    .catch(function (error) {
      alert("Sorry, something wrong. New client haven't added.");
      console.log(error);
    });
    console.log("Added to DB")
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
    this.setState({ showAddForm: true })
  }

  
  
  _show() {
    // Don't forget that loading can be any data type you want!
    if (this.state.isLoading) {
      return (
        <div className="loading">
          <img src={loader} />
        </div>
      );
    } 
  }
  
  getCategories = () => {
    this.getRequests("categories");
  }
  updateCategories = () => {
    this.putRequests("category",{id: 13, name:"sport", type:0, Icon:"faSport"});
  }

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
            <div>{(c.type)?"expense":"income"}</div>
            <div>{c.category.name}</div>
            <div>{c.paymentMethod.name}</div>
            <div>{c.amount}</div>
            <div>{c.currency}</div>
            <div>{c.comment}</div>
          </div>)
      })}
    </div>

    
  render() {
    let { records, startIndex, endIndex, lastPage } = this.getCurrentRecords()
    // console.log(records)
    return (
      <div className="App">
        {this.showNavBar()}
        <div className="container">
          <div className="row-bar">
            {this.showSearchBar()}
            {this.showPagination(startIndex, endIndex, lastPage)}
          </div>
         
          {this.renderRecords(records)}
          {this.state.showAddForm ? <AddForm /> : null} 
          {this._show()}
        </div>
        categories
        <button type="button" onClick={this.updateCategories}>updateCategory</button>
        {/* <button type="button" onClick={this.getCategories}>getCategory</button> */}
        {/* <button type="button" onClick={this.postRequests({name:"business", type:0, Icon:"faGlobe"},"category")}>addCategory</button> */}
      </div>
    )
  }
}

export default Main;
