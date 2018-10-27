import React, { Component } from 'react'
import Chart1 from './chart1'
import Chart2 from './chart2'
import Chart3 from './chart3'
import axios from 'axios'
class Charts extends Component {
    constructor() {
        super()
      this.state={
            allRecords:[]
           
        }
    } 
    componentDidMount() {
        this.getDataFromDB();
      }

      
    
    //   getCategories() {
    //     axios.get(`http://localhost:5001/categories`)
    //       .then(result => {
    //         console.log("categories",result);
    //         this.setState({allCategories:result.data});
            
    //       })
    //   }
    getDataFromDB() {
        let userId = 1;//this.props.id;
        axios.get(`http://localhost:5001/getData/${userId}`)
          .then(result => {
            // console.log(result.data[0].record);
            this.setState({ allRecords: result.data[0].record });
            this.setState({ isLoading: false })
          })
      } 

    render() { 
        console.log('this state', this.state.allRecords);
        
        return (
            <div>
              CHARTS
              {/* <Chart1 allRecords={this.state.allRecords} /> */}
              <Chart3 allRecords={this.state.allRecords} />

              <Chart2 />
            </div>
        )

    }
}

export default Charts;
