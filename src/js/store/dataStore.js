import { observable, action, computed, reaction } from "mobx";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
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
	@observable limitation = 2000;
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
            }
        }
    );

	// @action closeUpdateModal = () => {
	// 	this.showComponent = false;
	// }

	addNewUserToState = (newUser) => {
		this.users.push(newUser);
		console.log(this.users);
	}

}

const store = new DataStore();
window.store = store;
export default store;