var express = require('express')
var app = express();

//making the connection with mongoose
const config = require('../config/index.js')
const DBConnection = require('../db/connection')
var c = config.getConfig("db")
DBConnection.initialize(c);

var bodyParser = require('body-parser')
app.use(bodyParser.json())

const groupHandler = require('../handlers/groupHandler')

const cors = require('cors')
app.use(cors())

var jwt = require('express-jwt');
app.use(                                                     
    jwt(
        { secret: config.getConfig('jwt').key }
    )
);

const url = '/app/v1/groups/'

app.get(url + 'get/', groupHandler.getGroups)
app.post(url, groupHandler.saveGroup)
app.delete(url + ':id', groupHandler.deleteGroup);
app.put(url + ':id', groupHandler.updateGroup);

app.listen(8082, (err) => {
    if(err) {
        console.log(err)
        console.log("Error")
        return;
    }
    return console.log("Groups server has started successfully on port 8082")
})