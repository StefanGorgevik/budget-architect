const Group = mongoose.model(
    'group', new mongoose.Schema({
        date: Date,
        totalPrice: Number,
        userID:String,
        products: Array
    },{collection: 'groups'}) 
)