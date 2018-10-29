import { observable, action, computed, reaction } from "mobx";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
const key='d808c36e40546d97843e42050e80a2a7';
const monthNames = {'1':"Jan", '2':"Feb", '3':"Mar", '4':"Apr", '5':"May", '6':"Jun", '7':"Jul", '8':"Aug", '9':"Sept", '10':"Oct", '11':"Nov", '12':"Dec"};
class DataStore {
	@observable username = "";
	// @observable password="";
	@observable id = -1;
	@observable isLoading = true;
	@observable loggedIn = false;
	@observable showErrorMessage = false;
	@observable errorMessage = "";
	@observable allRecords = [];
	@observable dataExpense = [];
	@observable dataExpenseIncomeYear = [];
	@observable limitation = 2000;
	// @observable currency ="NIS";
	// @observable cFrom="";
	// @observable cTo="";
	// @observable cAmount="";

	// @observable  currentUserIdForAddChild= {};

	@action getDataFromDB = () => {
		let userId = 1;//this.props.id;
		console.log("GETDATAFROMDB");
		axios.get(`/getData/${userId}`)
			.then(result => {
				// console.log(result.data[0].record);
				this.allRecords = result.data[0].record;
				console.log("store allrecords", this.allRecords);
				this.isLoading = false;
			})
	}
zz
	@action logout = () => {
		console.log("close");
		this.loggedIn = false;
		// return(
		// <Redirect to={{ pathname: '/login' }} />
		// )
	}
	@action toggle = () => {
		this.showErrorMessage = !this.showErrorMessage;
	}

	@action generateNewData = () => {
		console.log("GENERATEDATA", this.allRecords);
		let categoryAmount = [], categories = [];
		let income = [];
		this.allRecords.forEach(function (item, i, arr) {
			console.log("item");
			if (item.type !== 1) {
				let index = categories.indexOf(item.category.name);
				if (index === -1) {
					let categoryName = item.category.name;
					console.log("category name", categoryName, item.amount);
					categoryAmount.push({ name: categoryName, amount: item.amount });
					categories.push(categoryName);
				}
				else {
					categoryAmount[index].amount += item.amount;
				}
			}
			// else {
			//     if (categoryAmount [item.category.name] == undefined) {
			//     let categoryName=item.category.name;
			//     income.push({name:categoryName, amount:item.amount})
			//     }
			//     else {
			//         income[item.category.name] += item.amount;
			//     }
			// }
		})
		console.log("catAmount", categoryAmount, "income", income);
		this.dataExpense = categoryAmount
		// this.setState({dataExpense: categoryAmount, dataIncome: income})
		// return categoryAmount;
	}

	getDataForCharts = reaction(
        () => (this.allRecords),
        records => {
            if (records.length) {
				this.generateNewData();
				this.generateNewDataYear();
            }
        }
	);
	
	@action generateNewDataYear = () => {
		let data = this.allRecords;
        let resultArray = [], monthAmount = {}, monthAmountIncome = {};
        let currentDate = new Date();
        let currentYear = currentDate.getFullYear();
        for (let i = 0; i < data.length; i++) {
            let clientTime = new Date(data[i].date);
            if (clientTime.getFullYear() === currentYear) {
				let recMonth = clientTime.getMonth();
				console.log("data type",data[i].type);
                if (data[i].type === 0) {
                    monthAmount[recMonth] = (monthAmount[recMonth] !== undefined) ?
                        monthAmount[recMonth] + data[i]["amount"] : data[i]["amount"];
                }
                else {
					debugger;
                    monthAmountIncome[recMonth] = (monthAmountIncome[recMonth] !== undefined) ?
                        monthAmountIncome[recMonth] + data[i]["amount"] : data[i]["amount"];
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
            }
            resultArray.push(result);
        }
    console.log("resultArray", resultArray);
     this.dataExpenseIncomeYear=resultArray 
	}

	// @action closeUpdateModal = () => {
	// 	this.showComponent = false;
	// }

	addNewUserToState = (newUser) => {
		this.users.push(newUser);
		console.log(this.users);
	}

	@action convertCurrency = () =>{
			let currency=this.currency
			return axios.get(`http://data.fixer.io/api/convert?access_key=${key}&from=${this.cFrom}&to=${this.cTo}&amount=${this.cAmount}`)
			  .then(result => {
				console.log(result);
			  })
			  .catch(function (error) {
				console.log("Sorry, something wrong. Get request failed", error);
			  });		
	}
}

const store = new DataStore();
window.store = store;
export default store;