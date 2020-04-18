const mongoose = require('mongoose')

var Product = mongoose.model(
    'product', new mongoose.Schema({
            name: String,
            type: String,
            price: Number,
            quantity: Number,
            date: Date,
            userID: String
        }, {collection: "products"})
)

const saveProduct = (data) => {
    return new Promise((success, fail) => {
        var product = new Product(data)
        product.save(data, err => {
            if(err) {
                return fail;
            } else {
                return success(data)
            }
        })
    })
}

const getProducts = (id) => {
    return new Promise((success, fail) => {
       Product.find({userID: id}, (err, data) => {
           if(err) {
               console.log(err)
               return fail;
           }
           return success(data)
       })
    })
}

const deleteProduct = (id) => {
    return new Promise((success,fail) => {
        Product.deleteOne({_id: id}, err => {
            if(err) {
                return fail(err);
            }
            return success();
        })
    })
}

const updateProduct = (id, data) => {
    return new Promise((success, fail) => {
        Product.updateOne({ _id: id }, data, err => {
            if (err) {
                return fail(err)
            }
            return success(data)
        })
    })
}

module.exports = {
    saveProduct,
    getProducts,
    deleteProduct,
    updateProduct
}