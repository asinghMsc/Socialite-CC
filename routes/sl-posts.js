// importing express and router
const express = require('express')
const router = express.Router()

const sl_User = require('../models/sl-user')
const sl_Post = require('../models/sl-posts')
const { post } = require('./auth')

const verify = require('../verifyToken')

// POST create data
router.post('/', verify, async(req,res) =>{
    const dataPost = new post({
        title: req.body.title,
        description: req.body.description,
        comments: req.body.comments
        
    })
    try{
        const savedPost = await dataPost.save()
        res.json(savedPost)
    }catch(err){
        res.json({message: err})
    }
})

// GET all data
router.get('/', verify, async(req,res) =>{
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

