const productModel = require('../models/productModel')
// const usersModel = require('../models/usersModel')

const saveProduct = (req,res) => {
    const product = req.body
    const user = req.user;
    // usersModel.updateUser(user.id, {...user})
    productModel.saveProduct({...product, userID: user.id})
    .then((data) => {
        res.status(201).send(data)
    })
    .catch((err) => {
        res.status(500).send(err)
    })
}

const getProducts = (req, res) => {
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

    
    productModel.getProducts(q, sort)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(err);
        })
}

const deleteProduct = (req, res) => {
    productModel.deleteProduct(req.params.id)
    .then(() => {
        res.status(204).send("Item deleted");
    })
    .catch((err) => {
        res.status(500).send(err);
    })
}

const updateProduct = (req, res) => {
    var newProduct = req.body;
    productModel.updateProduct(req.params.id, newProduct)
        .then(() => {
            res.status(201).send('Item updated!');
        })
        .catch((err) => {
            res.status(500).send(err)
        })
}

module.exports = {
    saveProduct,
    getProducts,
    deleteProduct,
    updateProduct
}