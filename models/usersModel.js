const mongoose = require('mongoose')

const User = mongoose.model(
    "user",
    new mongoose.Schema({
        name: String,
        income: Number,
        email: String,
        password: String
    })
)


const register = (data) => {
    return new Promise((success, fail) => {
        var user = new User(data)
        user.save(data, err => {
            if (err) {
                return fail;
            } else {
                return success(data)
            }
        })
    })
}

const login = (email) => {
    return new Promise((success, fail) => {
        User.find({ email: email }, (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data[0])
        })
    })
}

const getUser = (id) => {
    return new Promise((success, fail) => {
        User.find({ _id: id }, (err, data) => {
            if (err) {
                return fail(err)
            }
            return success(data)
        })
    })
}

const updateUser = (id, data) => {
    return new Promise((success, fail) => {
        User.updateOne({ _id: id }, data, err => {
            if (err) {
                res.status(500).send(err);
                return fail(err)
            }
            return success(data)
        })
    })
}

const getUserPasswordByEmail = (email) => {
    return new Promise((success, fail) => {
        User.find({email: email}, {password: 1, email: 1, first_name: 1, last_name: 1}, (err, data) => {
            if(err){
                return fail(err);
            }
            return success(data[0]);
        });
    });
}


module.exports = {
    register,
    login,
    getUser,
    updateUser,
    getUserPasswordByEmail
}