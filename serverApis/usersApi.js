
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
            // console.log("user", user);
            if (!user) {
                bcrypt.hash(req.body.password, 10, function (err, hash) {
                    if (err) { throw (err); }
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
            }
            else {
                console.log("already exist")
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
            // res.json(user)
            if (user) {
                console.log("req.body.password", req.body.password);
                console.log("user.data.password", user.dataValues.password);
                bcrypt.compare(req.body.password, user.dataValues.password, function (err, isPasswordMatch) {
                    console.log(isPasswordMatch);
                    if(isPasswordMatch) {
                        res.json(user)
                       } else {
                           res.send(false);
                        // Passwords don't match
                        console.log(err);
                       } 
                })
            
            }
            else res.send("user doesn't exist");
        });
});



// ----------------Get-------------------

// router.get('/getUsers', async (req, res) => {
//     Person.findAll()
//         .then(users => res.json(users))
// })

router.get('/getData/:id', async (req, res) => {
    userId = req.params.id;
    console.log("userId", userId);
    User.findAll({
        attributes: ['id', 'name'],
        include: [{
          model: Record,
          as: "record",

        }],
        where: { id: userId }
      }).then(user => {
        res.send(user)
     
      }).error((err) => {
        console.error(err);
        res.status(500).send(err)
      })
     })
    // Record.find({
    //     include: [{ model: User, as: "User" }],
    //     where: { userId: userId }
    // })
    //     .then((users) => {
    //         res.json(users)
    //     })
    //     .error((err) => {
    //         res.status(500).send(err);
    // })
// })



// const addRelationship = async function () {
//     let person = await Person.create({ name: "Target" })
//     let parent = await Parent.create({ name: "Julius" })
//     parson.addCustomer(customer)
//     //alternatively, could also do customer.addStore(store)
// }
// addRelationship()

module.exports = router;