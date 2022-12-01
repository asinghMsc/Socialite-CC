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
router.patch('/like/:postId', verify, async(req,res) =>{
  
    try{
     
        const updatePostById = await Post.updateOne(
            {_id:req.params.postId},
            {$push:{
                likes:req.user._id,
                postTime:req.body.postTime,
                $position:0,
                createdAt:req.body.createdAt

                }
                
            }) 

            // // only other users can like a post
            // const post = await Post.findOne({_id:req.params.postId})
            // if(post.user === req.user._id){
            //     return res.status(400).send({message:"You cannot like your own post"})
            // }

            // only other users can like a post
            // const post = await Post.findOne({_id:req.params.postId})
            // if(post.user === req.user._id){
            //     return res.status(400).send({message:"You cannot like your own post"})
            // }
 
        
        res.send(updatePostById)
    }catch(err){
        res.send({message:err})
    }

})

// Disliking a post
router.patch('/dislike/:postId', verify, async(req,res) =>{
    try{
        const updatePostById = await Post.updateOne(
            {_id:req.params.postId},
            {$set:{
                dislikes:req.body.dislikes,
                postTime:req.body.postTime
                }
            })
        res.send(updatePostById)
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
// Moment JS reference : https://momentjs.com/docs/#/displaying/
router.patch('/comment/:postId', verify, async(req,res) =>{
    try{
        const updatePostById = await Post.updateOne(
            {_id:req.params.postId},
            {$push:{
                comments:{ $each:[req.body.comments, req.user._id, moment().format('MMMM Do YYYY, h:mm:ss a')], $position: 0 },
              
                user:req.body.user
            }
                }
            )
        res.send(updatePostById)
    }catch(err){
        res.send({message:err})
    }
})

// Deleting a post
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