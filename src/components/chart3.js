import React, { Component } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { observer, inject } from 'mobx-react';
@inject("store")
@observer
class Chart3 extends Component {
    constructor() {
        super()

        this.state = {
            dataExpense: [],
            dataIncome: [],
            loading: true
        }
    }
    render() {
        return (
            <div>
            
                CHART1
              <BarChart width={600} height={300} data={this.props.store.dataExpense}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis dataKey="amount"/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" stackId="a" fill="#8884d8" />
                    {/* <Bar dataKey="male" stackId="a" fill="#82ca9d" /> */}
                    {/* <Bar dataKey="uv" fill="#ffc658" /> */}
                </BarChart>
                <button type="button" onClick={this.generateNewData}>CLick</button>
                
            </div>
        )

    }
}

export default Chart3;
