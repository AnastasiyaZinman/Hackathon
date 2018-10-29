import React, { Component } from 'react'
import { observer, inject } from 'mobx-react';
import Chart1 from './chart1'
import Chart2 from './chart2'
import Chart3 from './chart3'
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
            <div>
              {(this.props.store.loggedIn) ? 
              (<div>
              <Chart3  />
              <ChartYearCategories /></div>)
            :
            null
            }
        
            </div>
        )

    }
}

export default Charts;
