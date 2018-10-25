import axios from 'axios'

class AxiosFunc {
    getRequests(link) {
        axios.get(`http://localhost:5001/${link}`)
            .then(result => {
                console.log(result);
                // this.setState({allRecords:result.data[0].record});
            })
            .catch(function (error) {
                // alert("Sorry, something wrong. New client haven't added.");
                console.log(error);
            });

    }

    deleteRequests(link, id) { 
        link = "record";
        id = 15;
        console.log(link, id);
        axios.delete(`http://localhost:5001/delete/${link}/${id}`)
            .then(result => {
                console.log(result);
                // this.setState({allRecords:result.data[0].record});
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    putRequests(link, data) {
        axios.put(`http://localhost:5001/${link}`, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        )
            .then(response => {
                console.log("data from DB", response);
                // this.addNewClientToState(response.data)
            })
            .catch(function (error) {
                // alert("Sorry, something wrong. New client haven't added.");
                console.log(error);
            });
        console.log("Added to DB")
    }
    postRequests(link, data) {
        // let data = {name:"business", type:0, Icon:"faGlobe"};
        axios.post(`http://localhost:5001/${link}`, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        )
            .then(response => {
                console.log("data from DB", response);
                // this.addNewClientToState(response.data)
            })
            .catch(function (error) {
                alert("Sorry, something wrong. New client haven't added.");
                console.log(error);
            });
        console.log("Added to DB")
    }

    addCategory = () => {
        this.postRequests("category", { name: "business", type: 0, Icon: "faGlobe" });
    }
    addRecord = () => {
        this.postRequests("record", {
            userId: this.state.allRecords[0].userId,
            date: "2018-08-30",
            type: 1,
            categoryId: 1,
            paymentMethod: 0,
            amount: 100,
            currency: 'USD',
            comment: "nice"
        });
    }
    getCategories = () => {
        this.getRequests("categories");
    }
    deleteRecord = () => {
        let id = 10;
        this.deleteRequests("record", id);
    }
    deleteCategory = () => {
        let id = 8;
        this.deleteRequests("category", id);
    }
    updateCategories = () => {
        this.putRequests("category", { id: 13, name: "sport", type: 0, Icon: "faSport" });
    }
    updateRecord = () => {
        this.putRequests("record",
            {
                id: 7,
                userId: this.state.allRecords[0].userId,
                date: "2018-08-30",
                type: 1,
                categoryId: 3,
                paymentMethod: 0,
                amount: 50,
                currency: 'USD',
                comment: "nice"
            });
    }

}

const axiosFuncs = new AxiosFunc();

export default axiosFuncs;



//   <button type="button" onClick={this.deleteCategory}>deleteCategory</button>

//   {/* <button type="button" onClick={this.deleteRecord}>deleteRecord</button> */}
//   //<button type="button" onClick={this.updateRecord}>updateRecord</button>
//   {/* <button type="button" onClick={this.addRecord}>addRecord</button> */}
//   {/* <button type="button" onClick={this.updateCategories}>updateCategory</button> */}
//   {/* <button type="button" onClick={this.getCategories}>getCategory</button> */}
//   {/* <button type="button" onClick={this.addCategory}>addCategory</button> */}