import React, { Component } from 'react'
import { render } from 'react-dom'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { observer, inject } from 'mobx-react';
const monthNames = {'1':"Jan", '2':"Feb", '3':"Mar", '4':"Apr", '5':"May", '6':"Jun", '7':"Jul", '8':"Aug", '9':"Sept", '10':"Oct", '11':"Nov", '12':"Dec"};
// const month=Object.keys(monthNames);
const month=['1','2','3','4','5','6','7','8','9','10','11','12'];
const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];
@inject("store")
@observer
class ChartYearCategories extends Component {
    constructor() {

        super()
        this.state = {
            dataForChart: []
        }
    }
    // componentDidMount() {
    //   }
    createDaysData = () => {
        let data = this.props.store.allRecords;
        let resultArray = [], monthAmount = {}, monthAmountIncome = {};
        let currentDate = new Date();
        let currentYear = currentDate.getFullYear();
        for (let i = 0; i < data.length; i++) {
            let clientTime = new Date(data[i].date);
            if (clientTime.getFullYear() === currentYear) {
                let recMonth = clientTime.getMonth();
                if (data[i].type === 0) {
                    monthAmount[recMonth] = (monthAmount[recMonth] !== undefined) ?
                        monthAmount[recMonth] + data[i]["amount"] : 0;
                }
                else {
                    monthAmountIncome[recMonth] = (monthAmountIncome[recMonth] !== undefined) ?
                        monthAmountIncome[recMonth] + data[i]["amount"] : 0;
                }
            }
        }
        console.log("monthAmount",monthAmount);
        console.log("monthAmountIncome",monthAmountIncome);
        for (let m = 1; m <= 12; m++) {
            let current_month=monthNames[m];
            let result = {
                "name": current_month, 
                "expense": monthAmount[m] ,
                "income": monthAmountIncome[m]
                // "expense": (monthAmount[current_month]!==undefined)?monthAmount[current_month]:0,
                // "income": (monthAmountIncome[current_month]!==undefined)?monthAmountIncome[current_month]:0
            }
            resultArray.push(result);
        }
    console.log("resultArray", resultArray);
    this.setState({ dataForChart: resultArray })
    // console.log(resultArray);
  }
render() {

    return (
        <div>
            CHARTS
              <LineChart width={600} height={300} data={this.props.store.dataExpenseIncomeYear}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="expense" stroke="white" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
            {/* <button type="button" onClick={this.createDaysData}>DataChart</button> */}
        </div>
    )

}
}
export default ChartYearCategories;
