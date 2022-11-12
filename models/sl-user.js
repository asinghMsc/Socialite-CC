const mongoose = require('mongoose')

const sl_User_Schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        min:4,
        max:255
    },
    email: {
        type: String,
        required: true,
        min:6,
        max:255
    },

})