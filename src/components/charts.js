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
        
        return (
            <div>
              CHARTS
              {/* <Chart1 allRecords={this.state.allRecords} /> */}
              <Chart3  />
              <ChartYearCategories />
              {/* <Chart2 /> */}
            </div>
        )

    }
}

export default Charts;
