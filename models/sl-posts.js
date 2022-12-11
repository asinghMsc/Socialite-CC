// saving mongoose to a variable
const mongoose = require('mongoose')

// assiging date.now to a variable
const createdAt = Date.now() 

// creating a schema for the posts
const PostSchema = mongoose.Schema({
    
   
    user:{
        type:String,
        required:true
    },
    postTime:{
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
    }

})

// exporting the model
module.exports = mongoose.model('sl-posts',PostSchema)