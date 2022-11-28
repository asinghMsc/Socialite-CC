const mongoose = require('mongoose')

// comment schema
const CommentSchema = mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    text:{
        type:String
    },
    time:{
        type:Date,
        default:Date.now
    },
})

// implementing comments
CommentSchema.methods.addComment = function(comment){
    this.comments.push(comment)
    return this.save()
}

// implementing likes
CommentSchema.methods.addLike = function(like){
    this.likes.push(like)
    return this.save()
}

// implementing dislikes
CommentSchema.methods.removeLike = function(like){
    this.likes.pull(like)
    return this.save()
}

const Comment = mongoose.model('sl-comments', CommentSchema)
module.exports = Comment