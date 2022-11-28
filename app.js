//assigning packages to variables
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bParser = require('body-parser')
app.use(express.json())

require('dotenv/config')

//initialising body parser for requests
app.use(bParser.json())

// setting up routes - 
const slpRoute = require('./routes/sl-posts')
const authRoute = require('./routes/auth')
const slcRoute = require('./routes/sl-comments')

//Api routes8
app.use('/api/sl-posts', slpRoute)
app.use('/api/user', authRoute)
app.use('/api/sl-comments', slcRoute)

//connecting to database
mongoose.connect(process.env.DB_CONNECT, ()=> {
    console.log('Database is now connected')
})



//run server 
app.listen(3000, ()=> {
    console.log('server is up & running')
})
