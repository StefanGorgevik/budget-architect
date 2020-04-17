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
        console.log(data)
        product.save(data, err => {
            if(err) {
                return fail;
            } else {
                return success(data)
            }
        })
    })
}

// const saveDiet = (data) => {
//     return new Promise((success, fail) => {
//         var diet = new Diet(data)
//         diet.save(data, err => {
//             if(err) {
//                 return fail;
//             } else {
//                 return success(data)
//             }
//         })
//     })
// }

// const getWorkoutPlan = (userID) => {
//     return new Promise((success, fail) => {
//         WorkoutPlan.find({userID: userID}, (err, data) => {
//             if(err) {
//                 return fail(err)
//             } else {
//                 return success(data[0])
//             }
//         })
//     })
// }

// const updateWorkoutPlan = (dietID, userID, data) => {
//     return new Promise((success, fail) => {
//         WorkoutPlan.updateOne({_id: dietID, userID: userID}, data, err =>{
//             if(err) {
//                 return fail(err)
//             } 
//             return success(data)
//         })
//     })
// }

// const getDiet = (userID) => {
//     return new Promise((success, fail) => {
//         Diet.find({userID: userID}, (err, data) =>{
//             if(err) {
//                 return fail(err)
//             } 
//             return success(data)
//         })
//     })
// }

// const updateDiet = (dietID, userID, data) => {
//     return new Promise((success, fail) => {
//         Diet.updateOne({_id: dietID, userID: userID}, data, err =>{
//             if(err) {
//                 return fail(err)
//             } 
//             return success(data)
//         })
//     })
// }


module.exports = {
    saveProduct,
    // saveDiet,
    // getWorkoutPlan,
    // getDiet,
    // updateDiet,
    // updateWorkoutPlan
}