const productModel = require('../models/productModel')
// const usersModel = require('../models/usersModel')

const saveProduct = (req,res) => {
    const product = req.body
    const user = req.user;
    // usersModel.updateUser(user.id, {...user})
    productModel.saveProduct({...product, userID: user.id})
    .then(() => {
        res.status(201).send("Workout plan created!")
    })
    .catch((err) => {
        res.status(500).send(err)
    })
}

const getProducts = (req, res) => {
    productModel.getProducts(req.params.id)
        .then(data => {
            console.log(data)
            res.status(200).send(data);
        })
        .catch(err => {
            console.log(err)

            res.status(500).send(err);
        })
}


// const getWorkoutPlan = (req, res) => {
//     planModel.getWorkoutPlan(req.params.id)
//     .then((data) => {
//         res.status(200).send(data)
//     })
//     .catch((err) => {
//         res.status(500).send(err)
//     })
// }

// const updateWorkoutPlan = (req, res) => {
//     planModel.updateWorkoutPlan(req.params.id, req.user.id, req.body)
//     .then((data) => {
//         res.status(201).send(data)
//     })
//     .catch((err) => {
//         res.status(500).send(err)
//     })
// }

// const getDiet = (req, res) => {
//     planModel.getDiet(req.params.id)
//     .then((data) => {
//         res.status(200).send(data)
//     })
//     .catch((err) => {
//         res.status(500).send(err)
//     })
// }

// const updateDiet = (req, res) => {
//     planModel.updateDiet(req.params.id, req.user.id, req.body)
//     .then((data) => {
//         res.status(201).send(data)
//     })
//     .catch((err) => {
//         res.status(500).send(err)
//     })
// }

module.exports = {
    saveProduct,
    getProducts
}