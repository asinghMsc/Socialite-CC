const express =require('express')
const router = express.Router()

//importing comments
const Comment = require('../models/sl-comments')


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