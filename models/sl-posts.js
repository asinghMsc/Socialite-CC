
const mongoose = require('mongoose')
const slUser = require('../models/sl-user')
const createdAt = Date.now() 


const PostSchema = mongoose.Schema({
    
   
    user:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    },
    hashtag:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    comments:{
        type:Array,
        required:true,
        createdAt
    },
    likes:{
        type:Array,
        required:true,
        createdAt
    },
    dislikes:{
        type:Array,
        required:true
    }

})


module.exports = mongoose.model('posts',PostSchema)