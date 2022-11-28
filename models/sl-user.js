const Joi = require('joi')
const mongoose = require('mongoose')


//creating a schema for the user
const sl_User_Schema = mongoose.Schema({
    
    username: {
        type: String,
        required: true,
        min:4,
        max:255
    },
    email: {
        type: String,
        required: true,
        min:6,
        max:255
    },
    password:{
        type: String,
        required: true,
        min:6,
        max:1024
    },
    date:{
        type: Date,
        default: Date.now
    }


})


//exporting the model
module.exports = mongoose.model('sl_User', sl_User_Schema)