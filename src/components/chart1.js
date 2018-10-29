import React, { Component } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
    { name: 'Page A', uv: 4000, female: 2400, male: 2400 },
    { name: 'Page B', uv: 3000, female: 1398, male: 2210 },
    { name: 'Page C', uv: 2000, female: 9800, male: 2290 },
    { name: 'Page D', uv: 2780, female: 3908, male: 2000 },
    { name: 'Page E', uv: 1890, female: 4800, male: 2181 },
    { name: 'Page F', uv: 2390, female: 3800, male: 2500 },
    { name: 'Page G', uv: 3490, female: 4300, male: 2100 },
];

// {Clothes: 100
// Food: 80
// FreeLance: 5000
// Health: 150
// Rent: 7100
// Restaurants: 130
// Salary: 15000
// Transportation: 15}
class Chart1 extends Component {
    constructor() {
        super()

        this.state = {
            data: []
        }

    }


    // generateCategoriesSet = () => {
    //     console.log("in the func",this.props.allRecords);
    //     let dataArr = [];
    //     var categoriesNames = new Set(dataArr);
    //     this.props.allRecords.forEach(record => {
    //         console.log("record", record["category"].name);
    //         categoriesNames.add(record["category"].name);
    //     });
    //     dataArr = [...categoriesNames]
    //     // console.log("clientsNames",clientsNames);
    //     this.setState({ allCategories: dataArr });
    //     console.log("allCategories",dataArr);
    //     this.generateNewData()
    // }

    generateNewData=()=>{
        let categoryAmount=[];
        
        this.props.allRecords.forEach(function(item, i, arr) {
            console.log("item");
            if (categoryAmount [item.category.name] == undefined) 
           { let categoryName=item.category.name;
            categoryAmount.push({ name: categoryName, sum:item.amount});
           }
            else {
                categoryAmount[item.category.name] += item.amount;
            }
        })
        console.log("catAmount",categoryAmount)
        this.setState({data: categoryAmount})
        }
    


    render() {
       
        return (
            <div>
            
                CHART1
              <BarChart width={600} height={300} data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="white"/>
                    <YAxis stroke="white"/>
                    <Tooltip />
                    <Legend />
                    {/* <Bar dataKey="amount" stackId="a" fill="#8884d8" /> */}
                    <Bar dataKey="male" stackId="a" fill="#82ca9d" />
                    <Bar dataKey="uv" fill="#ffc658" />
                </BarChart>
                <button type="button" onClick={this.generateNewData}>CLIck</button>
                
            </div>
        )

    }
}

export default Chart1;
