import React, { Component } from 'react'
import { observer, inject } from 'mobx-react';
import LogIn from './login'
import './charts/charts.css';
import ChartCategoriesExpenses from './chart3'
import ChartYearCategories from './ChartYearCategories'
import axios from 'axios'
@inject("store")
@observer
class Charts extends Component {
    constructor() {
        super()
      this.state={
            // allRecords:[]
        }
    } 
   
    componentDidMount() {
        this.props.store.getDataFromDB();
      }
      
    render() { 
        console.log('this state', this.props.store.allRecords);
        console.log("loggedIn",this.props.store.loggedIn);
        
        return (
            <div className="App">
              {(this.props.store.loggedIn) ?  (
              <div >
               {this.props.store.showNavBar()}
                <h1>Statistics</h1>
              <div className="charts-box">
              <ChartCategoriesExpenses  />
              <ChartYearCategories />
             </div>
             </div>
               )
             : 
             null
              }           
        
             </div>
        )

    }
}

export default Charts;
