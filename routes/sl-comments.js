const express =require('express')
const router = express.Router()

//importing comments
const Comment = require('../models/sl-comments')

//post comment
router.post('/', async(req,res)=>{
    //console.log(req.body)

    const commentData = new Comment({
        user:req.body.user,
        text:req.body.text,
        time:req.body.time
    })
    // try to insert...
    try{
        const commentToSave = await commentData.save()
        res.send(commentToSave)
    }catch(err){
        res.send({message:err})
    }
})

//get all comments
router.get('/', async(req,res) =>{
    try{
        const getComments = await Comment.find()
        res.send(getComments)
    }catch(err){
        res.send({message:err})
    }
})

// comments operation
router.patch('/comments/:postId', async(req,res) =>{
    try{
        const updatePostById = await Post.updateOne(
            {_id:req.params.postId},
            {$set:{
                comments:req.body.comments
                }
            })
        res.send(updatePostById)
    }catch(err){
        res.send({message:err})
    }
})


module.exports = router 