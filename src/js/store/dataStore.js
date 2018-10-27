import { observable, action, computed } from "mobx";
import axios from 'axios';
class DataStore {
	@observable username = "";
	@observable password="";
	@observable  id = -1;
	@observable loggedIn= false;
	@observable showErrorMessage= false;
	@observable errorMessage= "";
	// @observable  currentUserIdForAddChild= {};


	@action logout = () => {
		console.log("close");
		this.loggedIn = false;
	}
	@action toggle = () => {
        this.showErrorMessage= !this.showErrorMessage;
      }
    
	// @action closeUpdateModal = () => {
	// 	this.showComponent = false;
	// }


	addNewUserToState=(newUser)=>{
		this.users.push(newUser);
		console.log(this.users);
	}

}

const store = new DataStore();
window.store = store;
export default store;