// importing express and router and moment.js
const express =require('express')
const router = express.Router()
const moment = require('moment')
const slPosts = require('../models/sl-posts')
const Post = require('../models/sl-posts')
const verify = require('../verifyToken')
const timestamp = moment().format('MMMM Do YYYY, h:mm:ss a')

// Creating a new post
router.post('/', verify, async(req,res)=>{
    

    const postData = new Post({
        user:req.user,
        postTime:timestamp,
        title:req.body.title,
        text:req.body.text,
        hashtag:req.body.hashtag,
        location:req.body.location,
        url:req.body.url,
        postId : req.postId,
        comments:req.body.comments,
        likes:req.body.likes,
    })
    
    try{
        const postToSave = await postData.save()
        res.send(postToSave)
    }catch(err){
        res.send({message:err})
    }


})

// Liking a post
// User check using findOne to prevent users liking on own post & prevents multiple likes from one user: https://mongoosejs.com/docs/queries.html
router.patch('/like/:postId', verify, async(req,res) =>{
  
    try{
        // Check if the user is trying to like their own post
        const post = await Post.findOne({
            _id: req.params.postId,
            user: req.user._id
        });

        if (post) {
            // If the user is trying to like their own post, return an error
            res.send({message: 'Cannot like your own post'});
        } else {
            // Check if the user's ID already exists in the likes array
            const post = await Post.findOne({
                _id: req.params.postId,
                likes: req.user._id
            });

            if (post) {
                // If the user's ID exists in the likes array, return an error
                res.send({message: 'Post already liked'});
            } else {
                // Use $addToSet to add the user's ID to the likes array
                // if it doesn't already exist
                const updatePostById = await Post.updateOne(
                    {_id:req.params.postId},
                    {$addToSet:{
                        likes:req.user._id
                    },
                    // Set the postTime and createdAt fields on the post document
                    $set:{
                        postTime:req.body.postTime,
                        createdAt:req.body.createdAt
                    }
                });

                res.send(updatePostById)
            }
        }
    }catch(err){
        res.send({message:err})
    }

})


// Unliking a post
router.patch('/unlike/:postId', verify, async(req,res) =>{
    try{
        const updatePostById = await Post.updateOne(
            {_id:req.params.postId},
            {$set:{
                likes:req.body.likes,
                postTime:req.body.postTime
                }
            })
        res.send(updatePostById)
    }catch(err){
        res.send({message:err})
    }
})


// Commenting on a post, Array reference : https://www.mongodb.com/docs/v6.0/reference/operator/update/each/#mongodb-update-up.-each
// User check using findOne to prevent users commenting on own post: https://mongoosejs.com/docs/queries.html
router.patch('/comment/:postId', verify, async(req,res) =>{
    try{
        // Check if the user is trying to comment on their own post
        const post = await Post.findOne({
            _id: req.params.postId,
            user: req.user._id
        });

        if (post) {
            // If the user is trying to comment on their own post, return an error
            res.send({message: 'Cannot comment on your own post'});
        } else {
            // Use $push to add the comment to the comments array
            const updatePostById = await Post.updateOne(
                {_id:req.params.postId},
                {$push:{
                    comments:{
                        $each:[
                            {
                                user:req.user._id,
                                text:req.body.comments,
                                commentTime:timestamp
                            }
                        ],
                        $position: 0
                    }
                },
                // Set the user field on the post document
                $set:{
                    user:req.body.user
                }
            });

            res.send(updatePostById)
        }
    }catch(err){
        res.send({message:err})
    }
})


// Deleting a comment
router.patch('/deletecomment/:postId', verify, async(req,res) =>{
    try{
        const updatePostById = await Post.updateOne(
            {_id:req.params.postId},
            {$pull:{
                comments:req.body.comments,
                postTime:req.body.postTime
                }
            })
        res.send(updatePostById)
    }catch(err){
        res.send({message:err})
    }
})


// Get All Posts
router.get('/', verify, async(req,res) =>{

    
       try { const getPosts = await Post.find().limit(10)
            const posts = getPosts.sort((a,b) => b.likes.length - a.likes.length)
           
            res.send(getPosts)
    } catch(err){
        res.send({message:err})
    }

})

// Get a post by ID
router.get('/:postId', verify, async(req,res) =>{
    try{
        const getPostById = await Post.findById(req.params.postId)
        res.send(getPostById)
    }catch(err){
        res.send({message:err})
    }
})

// Patch a post by ID
router.patch('/:postId', verify, async(req,res) =>{
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
                postTime:req.body.postTime,
                comments:req.body.comments,
                likes:req.body.likes
                }
            })
        res.send(updatePostById)
    }catch(err){
        res.send({message:err})
    }
})


// Delete a post by ID
router.delete('/:postId', verify, async(req,res)=>{
    try{
        const deletePostById = await Post.deleteOne({_id:req.params.postId})
        res.send(deletePostById)
    }catch(err){
        res.send({message:err})
    }
})

module.exports = router