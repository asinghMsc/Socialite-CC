const express = require('express')
const router = express.Router()

const SL_User = require('../models/sl-user')
const SL_Post = require('../models/sl-posts')
const { post } = require('./auth')

//POST create data
router.post('/',async(req,res) =>{
    const dataPost = new post({
        
    })
})

