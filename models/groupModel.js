const mongoose = require('mongoose')

const Group = mongoose.model(
    'group', new mongoose.Schema({
        date: Date,
        store: String,
        totalPrice: Number,
        userID:String,
        products: Array
    },{collection: 'groups'}) 
)

const getGroups = (id) => {
    return new Promise((success,fail) => {
        Group.find({userID: id}, (err, data) => {
            if(err) {
                console.log(err)
                return fail(err);
            } else {
                return success(data)
            }
        })
    })
}

const saveGroup = (data) => {
    return new Promise((success, fail) => {
        var group = new Group(data)
        group.save(data, err => {
            if (err) {
                console.log(err)
                return fail(err);
            } else {
                return success(data)
            }
        })
    })
}

const deleteGroup = (id) => {
    return new Promise((success, fail) => {
        Group.deleteOne({_id: id }, err => {
            if (err) {
                console.log(err)
                return fail(err);
            }
            return success();
        })
    })
}

const updateGroup = (id, data) => {
    return new Promise((success, fail) => {
        Group.updateOne({ _id: id }, data, err => {
            if (err) {
                console.log(err)
                return fail(err)
            }
            return success(data)
        })
    })
}

module.exports = {
    saveGroup,
    getGroups,
    deleteGroup,
    updateGroup
}