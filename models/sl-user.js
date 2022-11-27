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

// creating a schema for the post
// const sl_Post_Schema = mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//         min:4,
//         max:255
//     },
//     description: {
//         type: String,
//         required: true,
//         min:6,
//         max:1024
//     },
//     date:{
//         type: Date,
//         default: Date.now
//     },
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'sl_User'
//     },
//     comments: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'sl_Comment'
//     }],
//     likes: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'sl_User'
//     }],
//     dislikes: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'sl_User'
//     }]



// })

//exporting the model
module.exports = mongoose.model('sl_User', sl_User_Schema)