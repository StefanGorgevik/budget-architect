const usersModel = require('../models/usersModel');
var validator = require('../node_modules/node-input-validator');
var userValidator = require('../validators/userValidator');
var bcrypt = require('../node_modules/bcryptjs');
var jwt = require('../node_modules/jsonwebtoken');
const config = require('../config/index.js');

const registerUser = (req, res) => {
    var newUser = req.body;
    var validate = new validator.Validator(newUser, userValidator.createUser);
    validate.check()
    .then(matched => {
        if(matched) {
            return usersModel.getUserPasswordByEmail(newUser.email)
            .then((ed) => {
                console.log(ed);
                if(!ed) {
                    bcrypt.genSalt(10, function(err, salt) {
                        if(err) {
                            throw new Error(err);
                            return;
                        } 
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) {
                                throw new Error(err);
                                return;
                            } return usersModel.register({...newUser, password: hash})
                        })
                    })
                } else {
                    console.log('else')
                    throw new Error('Bad Request - User Exists');
                }
            })
        } else {
            throw new Error("Validation failed");
        }
    })
    .then(() => {
        res.status(201).send("User registered!")
    })
    .catch((err) => {
        res.status(500).send(err)
    })
}

const loginUser = (req, res) => {
    var user = req.body
    usersModel.login(user.email)
    .then((data) => {
        bcrypt.compare(user.password, data.password, function(err, result) {
            if(err) {
                return res.status(500).send("Could not compare passwords")
            }
            if(result) {
                var tokenData = {
                    id: data._id,
                    name: data.name,
                    email: data.email
                }
                var token = jwt.sign(tokenData, config.getConfig('jwt').key)
                return res.status(200).send({jwt: token, id: data._id, name:tokenData.name, email: data.email, income: data.income})
            }
            return res.status(400).send('Not found!')
        })
    })
    .catch(err => {
        return res.status(500).send("Could not found user!");
    })
}

const getUser = (req, res) => {
    usersModel.getUser(req.params.id)
        .then((data) => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        })
}

const updateUser = (req, res) => {
    usersModel.updateUser(req.params.id, req.body)
        .then((data) => {
            res.status(200).send(data);
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(err);
        })
}

module.exports = {
    registerUser,
    loginUser,
    getUser,
    updateUser
}