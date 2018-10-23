
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

    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.password, salt)
        .then(function(hash) {
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

})
//----------------LogIn----------------
router.post('/logIn', jsonParser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);

    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {

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

})
//----------------LOgIn--------------
router.post('/logIn', jsonParser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    User.find({
        include: [{ model: Record, as: "Record" }],
        where: { password: req.body.password }
    })
        .then((users) => {
            bcrypt.compare(req.body.password,users.password)
            .then((data) => {
                res.json(users)
            })
            .error((err) => {
                res.status(500).send(err);
            })
            
        })
        .error((err) => {
            res.status(500).send(err);
        })
    }
)

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