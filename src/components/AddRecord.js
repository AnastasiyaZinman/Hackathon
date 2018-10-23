import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action, computed } from "mobx";
import  './childBox.css';
@inject(allStores => ({
    currentUserId: allStores.store.currentUserIdForAddChild,
    closeAddBox: allStores.store.closeAddBox,
    addChildToDb: allStores.store.addChildToDb
}))
@observer
class AddChild extends Component {
    @observable 
    newUserInfo={
        name: "",
        imgUrl: ""
    }
    @action inputChange = (e) => {
        this.newUserInfo[e.target.name] = e.target.value;
    }
     sendNewUserInfo = () => {
        console.log('Clicked');
        if(this.newUserInfo.name && this.newUserInfo.imgUrl)
        this.props.addChildToDb(this.newUserInfo) 
        else alert("Please write name and add image link");
    }
    
  

render()
{console.log("current ID", this.props.currentUserId)
return(
<div className="modal-body">
        <button type="button" className="close" onClick={this.props.closeAddBox}>
            <span aria-hidden="true">&times;</span>
        </button>
        <h5>Add new Child {this.props.currentUserId}</h5>
        <div className="container">
            <div className="row">
               <div className="col col-w">Name:</div>
                    <div className="col col-w">
                        <input type="text" name="name" onChange={this.inputChange} value={this.newUserInfo.name}  />
                    </div>
                    <div className="w-100"></div>
                    <div className="col col-w">Image:</div>
                    <div className="col col-w">
                        <input type="text" name="imgUrl" onChange={this.inputChange} value={this.newUserInfo.imgUrl} />
                    </div>
            </div>
                <button type="button" className="btn btn-info btn-update mt-3" onClick={this.sendNewUserInfo}>Update</button>
                 {/* <input type="button" className="btn btn-info" value="Input Button" /> */}
        </div>
    </div>
)
}
}
export default AddChild;