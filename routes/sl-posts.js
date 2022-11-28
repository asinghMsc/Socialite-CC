const express =require('express')
const router = express.Router()

const Post = require('../models/sl-posts')
const verify = require('../verifyToken')

//importing comments
const Comment = require('../models/sl-comments')
const { populate } = require('../models/sl-posts')



// POST (Create data)
router.post('/', verify, async(req,res)=>{
    //console.log(req.body)

    const postData = new Post({
        user:req.body.user,
        title:req.body.title,
        text:req.body.text,
        hashtag:req.body.hashtag,
        location:req.body.location,
        url:req.body.url,
        time:req.body.time,
        comments:req.body.comments,
        likes:req.body.likes
    })
    // try to insert...
    try{
        const postToSave = await postData.save()
        res.send(postToSave)
    }catch(err){
        res.send({message:err})
    }
})

// post like
router.patch('/like/:postId', verify, async(req,res) =>{
    try{
        const updatePostById = await Post.updateOne(
            {_id:req.params.postId},
            {$set:{
                likes:req.body.likes,
                time:req.body.time
                }
            })
        res.send(updatePostById)
    }catch(err){
        res.send({message:err})
    }
})

// remove like
router.patch('/unlike/:postId', verify, async(req,res) =>{
    try{
        const updatePostById = await Post.updateOne(
            {_id:req.params.postId},
            {$set:{
                likes:req.body.likes,
                time:req.body.time
                }
            })
        res.send(updatePostById)
    }catch(err){
        res.send({message:err})
    }
})


// post comment
router.patch('/comment/:postId', verify, async(req,res) =>{
    try{
        const updatePostById = await Post.updateOne(
            {_id:req.params.postId},
            {$push:{
                comments:req.body.comments,
                time:req.body.time
                }
            })
        res.send(updatePostById)
    }catch(err){
        res.send({message:err})
    }
})

// delete comment
router.patch('/deletecomment/:postId', verify, async(req,res) =>{
    try{
        const updatePostById = await Post.updateOne(
            {_id:req.params.postId},
            {$pull:{
                comments:req.body.comments,
                time:req.body.time
                }
            })
        res.send(updatePostById)
    }catch(err){
        res.send({message:err})
    }
})







// Get 1 operation (Read all)
router.get('/', verify, async(req,res) =>{
    try{
        const getPosts = await Post.find().limit(10)
        res.send(getPosts)
    }catch(err){
        res.send({message:err})
    }
})

// Get 2 operation (Read by ID)
router.get('/:postId', async(req,res) =>{
    try{
        const getPostById = await Post.findById(req.params.postId)
        res.send(getPostById)
    }catch(err){
        res.send({message:err})
    }
})

// Patch operation
router.patch('/:postId', async(req,res) =>{
    try{
        const updatePostById = await Post.updateOne(
            {_id:req.params.postId},
            {$set:{
                user:req.body.user,
                title:req.body.title,
                text:req.body.text,
                hashtag:req.body.hashtag,
                location:req.body.location,
                url:req.body.url,
                time:req.body.time,
                comments:req.body.comments,
                likes:req.body.likes
                }
            })
        res.send(updatePostById)
    }catch(err){
        res.send({message:err})
    }
})

// Add comments


// Delete operation
router.delete('/:postId',async(req,res)=>{
    try{
        const deletePostById = await Post.deleteOne({_id:req.params.postId})
        res.send(deletePostById)
    }catch(err){
        res.send({message:err})
    }
})




module.exports = router