//assigning packages to variables
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bParser = require('body-parser')

require('dotenv/config')

//initialising body parser for requests
app.use(bParser.json())

// setting up routes - 
const slpRoute = require('./routes/sl-posts')
const authRoute = require('./routes/auth')

app.use('/api/sl-posts', slpRoute)
app.use('/api/user', authRoute)

//connecting to database
mongoose.connect(process.env.DB_CONNECT, ()=> {
    console.log('Database is now connected')
})

//JWT authentication
const jwt = require('jsonwebtoken')
app.post('/api/posts', verifyToken, (req,res) => {
    jwt.verify(req.token, 'secretkey',
     (err, authData) => {
        if(err){
            res.sendStatus(403)
        }else{
            res.json({
                message: 'Post created...',
                authData
            })
        }
    })
})

//verify token
function verifyToken(req, res, next){
    //get auth header value
    const bearerHeader = req.headers['authorization']
    //check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        //split at the space
        const bearer = bearerHeader.split(' ')
        //get token from array
        const bearerToken = bearer[1]
        //set the token
        req.token = bearerToken
        //next middleware
        next()
    }else{
        //forbidden
        res.sendStatus(403)
    }
}




//run server 
app.listen(3000, ()=> {
    console.log('server is up & running')
})
