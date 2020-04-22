var groupModel = require('../models/groupModel')

const getGroups = (req,res) => {
    let q = {};
    q.userID = req.user.id;
    let sort = {};
    if(req.query.date_from != undefined) {
        if(q.date == undefined){
            q.date = {};
        }
        q.date.$gte = new Date(Number(req.query.date_from));
    }

    if(req.query.date_to != undefined) {
        if(q.date == undefined){
            q.date = {};
        }
        q.date.$lte = new Date(Number(req.query.date_to));
    }

    
    groupModel.getGroups(q)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(err);
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

const updateGroup = (req, res) => {
    var newGroup = req.body;
    groupModel.updateGroup(req.params.id, newGroup)
        .then(() => {
            res.status(201).send('Item updated!');
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send(err)
        })
}

module.exports = {
    getGroups,
    saveGroup,
    deleteGroup,
    updateGroup
}