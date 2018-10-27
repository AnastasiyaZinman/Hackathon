import React, { Component } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class Chart3 extends Component {
    constructor() {
        super()

        this.state = {
            dataExpense: [],
            dataIncome: [],
            loading: true
        }
    }

    generateNewData=()=>{
        let categoryAmount=[];
        let income=[];
        this.props.allRecords.forEach(function(item, i, arr) {
            console.log("item");
            if(item.type!==1){
            if (categoryAmount [item.category.name] == undefined) 
           { let categoryName=item.category.name;
            categoryAmount.push({ name: categoryName, amount:item.amount});
           }
            else {
                categoryAmount[item.category.name] += item.amount;
            }
        }
        else {
            if (categoryAmount [item.category.name] == undefined) {
            let categoryName=item.category.name;
            income.push({name:categoryName, amount:item.amount})
            }
            else {
                income[item.category.name] += item.amount;
            }
        }})
        console.log("catAmount",categoryAmount,"income",income)
        this.setState({dataExpense: categoryAmount, dataIncome:income})
        }
    


    render() {
       
        return (
            <div>
            
                CHART1
              <BarChart width={600} height={300} data={this.state.dataExpense}
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
                <button type="button" onClick={this.generateNewData}>CLIck</button>
                
            </div>
        )

    }
}

export default Chart3;
