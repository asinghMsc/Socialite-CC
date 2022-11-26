// importing mongoose
const mongoose = require('mongoose')

// post schema
const sl_Post_Schema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        min:4,
        max:255
    },
    description: {
        type: String,
        required: true,
        min:6,
        max:1024
    },
    date:{
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sl_User'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sl_Comment'
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sl_User'
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sl_User'
    }]
  
    
})

module.exports = mongoose.model('sl_Post', sl_Post_Schema)