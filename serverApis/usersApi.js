
const express = require('express')
//---------------------------------------
const router = express.Router()
const { User, Record } = require('../dataAccess/userModel');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
//--------------------------------------
const bcrypt = require('bcrypt');
const saltRounds = 10;
//----------------Post-------------------
//Add new user
router.post('/addUser', jsonParser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    console.log("username", req.body.username);
    User.findOne({ where: { name: req.body.username } })
        .then(user => {
            console.log("user", user);
            if (!user) {
                bcrypt.genSalt(saltRounds, function (err, salt) {
                    bcrypt.hash(req.body.password, salt)
                        .then(function (hash) {
                            console.log("here", hash);
                            User.create({
                                name: req.body.username,
                                password: hash,
                            })
                                .then((data) => {
                                    res.json(data)
                                })
                                .error((err) => {
                                    res.status(500).send(err);
                                })

                        });
                });
            }
            else {
                res.send("already exist");
            }
        })

})
//----------------LogIn----------------
router.post('/logIn', jsonParser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    console.log("username", req.body.username);
    User.findOne({
        where: {
            name: req.body.username,
        }
    })
        .then((user) => {
            console.log("data", user);
            res.json(user)
            if (user) {
                console.log("req.body.password", req.body.password);
                console.log("user.data.password", user.dataValues.password);
                bcrypt.compare(req.body.password, user.dataValues.password, function(err, isPasswordMatch) {   
                    err == null ?
                        console.log(isPasswordMatch) :
                        console.log(err);
                })
            // bcrypt.compare(req.body.password, user.dataValues.password)
            //     .then((data) => {
            //         user("result of compare",data)
            //         // res.json(users)
            //     .error((err) => {
            //         res.status(500).send(err);
            //     })

            //     })
            // .error((err) => {
            //    res.status(500).send(err);
            // })
        }
        else res.send("user doesn't exist");
        });
    });



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