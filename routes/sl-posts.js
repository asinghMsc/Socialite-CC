// importing express and router
const express = require('express')
const router = express.Router()

const sl_User = require('../models/sl-user')
const sl_Post = require('../models/sl-posts')
const { post } = require('./auth')

// POST create data
router.post('/',async(req,res) =>{
    const dataPost = new post({
        title: req.body.title,
        description: req.body.description,
        user: req.body.user,
        comments: req.body.comments,
        likes: req.body.likes,
        dislikes: req.body.dislikes
        
    })
    try{
        const savedPost = await dataPost.save()
        res.json(savedPost)
    }catch(err){
        res.json({message: err})
    }
})

// GET all data
router.get('/', async(req,res) =>{
    try{
        const posts = await sl_Post.find()
        res.json(posts)
    }catch(err){
        res.json({message: err})
    }
}
)

// GET specific data
router.get('/:postId', async(req,res) =>{
    try{
        const post = await sl_Post.findById(req.params.postId)
        res.json(post)
    }catch(err){
        res.json({message: err})
    }
}
)

// DELETE specific data
router.delete('/:postId', async(req,res) =>{
    try{
        const removedPost = await sl_Post.remove({_id: req.params.postId})
        res.json(removedPost)
    }catch(err){
        res.json({message: err})
    }
}
)

// UPDATE specific data
router.patch('/:postId', async(req,res) =>{
    try{
        const updatedPost = await sl_Post.updateOne(
            {_id: req.params.postId}, 
            {$set: {title: req.body.title}}
            )
        res.json(updatedPost)
    }catch(err){
        res.json({message: err})
    }
}
)

module.exports = router

