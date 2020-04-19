var groupModel = require('../models/groupModel')

const getGroups = (req,res) => {
    var id = req.user.id
    groupModel.getGroups(id)
    .then((data) => {
        res.status(200).send(data)
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
}

const saveGroup = (req, res) => {
    const newGroup = req.body
    const user = req.user;
    groupModel.saveGroup({...newGroup, userID: user.id})
    .then((data) => {
        res.status(201).send(data)
    })
    .catch((err) => {
        res.status(500).send(err)
    })
}

const deleteGroup = (req, res) => {
    groupModel.deleteGroup(req.params.id)
    .then(() => {
        res.status(204).send("Item deleted");
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send(err);
    })
}

module.exports = {
    getGroups,
    saveGroup,
    deleteGroup
}