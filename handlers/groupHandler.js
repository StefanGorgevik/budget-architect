var groupModel = require('../models/groupModel')

const saveDiet = (req, res) => {
    const newDiet = req.body
    const user = req.user;
    // usersModel.updateUser(user.id, {...user, isDietCreated: true})
    groupModel.saveDiet({...newDiet, userID: user.id})
    .then(() => {
        res.status(201).send("Diet created")
    })
    .catch((err) => {
        res.status(500).send(err)
    })
}

module.exports = {
    saveDiet
}