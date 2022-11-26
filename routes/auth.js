//importing express and router
const express = require('express')
const router = express.Router()

const slUser = require('../models/sl-user')
// const slPost = require('../models/sl-posts')

const { register_valid} = require('../validations/validation')

// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')

//registering a user
router.post('/register', async (req,res) => {
    // //validate the data before we make a user
    const { error } = register_valid(req.body)
    if(error) return res.status(400).send(error.details[0].message)

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

    // //checking if the user is already in the database
    // const emailExists = await SL_User.findOne({email: req.body.email})
    // if(emailExists) return res.status(400).send('Email already exists')

    // //hash passwords
    // const salt = await bcrypt.genSalt(10)
    // const hashedPassword = await bcrypt.hash(req.body.password, salt)


    // creating a new user
    const user = new slUser({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address
    })
    try{
        const savedUser = await user.save()
        // res.send({user: user._id})
    }catch(err){
        res.status(400).send({message:err})
    }
})

// //login
// router.post('/login', async (req,res) => {
//     //validate the data before we make a user
//     const { error } = loginValidation(req.body)
//     if(error) return res.status(400).send(error.details[0].message)

//     //checking if the email exists
//     const user = await SL_User.findOne({email: req.body.email})
//     if(!user) return res.status(400).send('Email is not found')

//     //password is correct
//     const validPass = await bcrypt.compare(req.body.password, user.password)
//     if(!validPass) return res.status(400).send('Invalid password')

//     //create and assign a token
//     const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
//     res.header('auth-token', token).send(token)
// })

module.exports=router
