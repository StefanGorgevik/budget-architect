var express = require('express')
var app = express();

//making the connection with mongoose
const config = require('../config/index.js')
const DBConnection = require('../db/connection')
var c = config.getConfig("db")
DBConnection.initialize(c);

var bodyParser = require('body-parser')
app.use(bodyParser.json())

const productHandler = require('../handlers/productHandler')

const cors = require('cors')
app.use(cors())

var jwt = require('express-jwt');
app.use(                                                     
    jwt(
        { secret: config.getConfig('jwt').key }
    )
);

app.post('/app/v1/products/', productHandler.saveProduct)

app.listen(8081, (err) => {
    if(err) {
        console.log(err)
        console.log("Error")
        return;
    }
    return console.log("Products server has started successfully on port 8081")
})