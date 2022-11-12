//assigning packages to variables
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bParser = require('body-parser')

require('dotenv/config')

//initialising body parser for requests
app.use(bParser.json())

//setting up routes
const wallRoute = require('./routes/wall')
const authRoute = require('./routes/auth')

app.use('/api/wall', wallRoute)
app.use('/api/auth',authRoute)

//connecting to database
mongoose.connect(process.env.DB_CONNECT, ()=> {
    console.log('Database is now connected')
})

//run server 
app.listen(3000, ()=> {
    console.log('server is up & running')
})
