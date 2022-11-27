//importing express and router
const express = require('express')
const router = express.Router()
router.use(express.json())

const slUser = require('../models/sl-user')
// const slPost = require('../models/sl-posts')

const {register_valid, login_valid} = require('../validations/validation')

const bcryptjs = require('bcryptjs')
const { json } = require('body-parser')
const jwt = require('jsonwebtoken')

//registering a user
router.post('/register', async (req,res) => {
    // //validate the data before we make a user
    const { error } = register_valid(req.body)
    if(error){
        return res.status(400).send({message:error['details'][0]['message']})
    }

    // //checking if the email is already in the database
    const emailExist = await slUser.findOne({email: req.body.email})
    if(emailExist){
        return res.status(400).send({message:"Error: This email already exists, please try again."})
    }

    // checking if username exists
    const usernameExist = await slUser.findOne({username: req.body.username})
    if(usernameExist){
        return res.status(400).send({message:"Error: This Username already exists, please try another one."})
    }


    //hashing the users password
    const salt = await bcryptjs.genSalt(5)
    const hashPassword = await bcryptjs.hash(req.body.password,salt)



    // creating a new user
    const user = new slUser({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
        address: req.body.address
    })
    try{
        const savedUser = await user.save()
        // res.send({user: user._id})
    }catch(err){
        res.status(400).send({message:err})
    }
})

//login
router.post('/login', async (req,res) => {
    // First validation to check the user's input for login
    const { error } = login_valid(req.body)
    if(error){
        return res.status(400).send({message:error['details'][0]['message']})
    }

    // Second validation to check if the user exists for login
    const user = await slUser.findOne({email: req.body.email})
    if(!user){
        return res.status(400).send({message:"Error: This email does not exist, please try again."})
    }

    // Third validation to check the user's password.
    const passwordValidation = await bcryptjs.compare(req.body.password, user.password)
    if(!passwordValidation){
        return res.status(400).send({message:"Error: The password you have entered is wrong, please try again."})
    }
    

    //generate auth token
    const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET)
    res.header('authToken',token).send({'authentication token':token})

//     //checking if the email exists
//     const user = await SL_User.findOne({email: req.body.email})
//     if(!user) return res.status(400).send('Email is not found')

//     //password is correct
//     const validPass = await bcrypt.compare(req.body.password, user.password)
//     if(!validPass) return res.status(400).send('Invalid password')

//     //create and assign a token
//     const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
//     res.header('auth-token', token).send(token)
})



module.exports=router
