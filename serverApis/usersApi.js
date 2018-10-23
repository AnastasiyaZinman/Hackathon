
const express = require('express')
//---------------------------------------
const router = express.Router()
const { User, Record } = require('../dataAccess/userModel');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

//----------------Post-------------------
//Add new user
router.post('/addUser', jsonParser,async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    console.log("here", req.body);
    User.create({
        name: req.body.username,
        password: req.body.password
    })
        .then((data) => {
                res.json(data)
        })
        .error((err) => {
            res.status(500).send(err);
        })

})
//----------------Get-------------------

// router.get('/getUsers', async (req, res) => {
//     Person.findAll()
//         .then(users => res.json(users))
// })

// router.get('/getChildren/:id', async (req, res) => {
//     userId = req.params.id;
//     console.log("userId", userId);
//     Person.find({
//         include: [{ model: Person, as: "Children" }],
//         where: { id: userId }
//     })
//         .then((users) => {
//             res.json(users)
//         })
//         .error((err) => {
//             res.status(500).send(err);
//         })
// })



// const addRelationship = async function () {
//     let person = await Person.create({ name: "Target" })
//     let parent = await Parent.create({ name: "Julius" })
//     parson.addCustomer(customer)
//     //alternatively, could also do customer.addStore(store)
// }
// addRelationship()

module.exports = router;