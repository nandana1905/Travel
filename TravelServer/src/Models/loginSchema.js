const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('login',loginSchema)