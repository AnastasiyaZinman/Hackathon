import React, { Component } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { observer, inject } from 'mobx-react';
@inject("store")
@observer
class ChartCategoriesExpenses extends Component {
    constructor() {
        super()

        this.state = {
            year: 2018,
            month: 0
            // dataExpense: [],
            // dataIncome: [],
            // loading: true
        }
    }
    componentDidMount() {
        this.getDate();
      }
      
      getDate = () => {
        let currentDate = new Date();
        let currentYear = currentDate.getFullYear(),
            currentMonth = currentDate.getMonth();
        this.setState({year:currentYear, month:currentMonth});
      }
    
    inputChange = (e) => {
        console.log(e.target.name)
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        return (
            <div>
                {/* {this.getOptions}    */}
                {/* <select name="time" value={this.state.year} onChange={this.inputChange} >
                        <option key="21" value={this.state.year}>year</option>
                        <option key="22" value={this.state.month}>{this.state.year}</option>
                    </select> */}
                    Expenses per Year
                <BarChart width={700} height={300} data={this.props.store.dataExpense}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="white"/>
                    <YAxis dataKey="amount" stroke="white"/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" stackId="a" fill="#8884d8" />
                    {/* <Bar dataKey="male" stackId="a" fill="#82ca9d" /> */}
                    {/* <Bar dataKey="uv" fill="#ffc658" /> */}
                </BarChart>

            </div>
        )

    }
}

export default ChartCategoriesExpenses;
