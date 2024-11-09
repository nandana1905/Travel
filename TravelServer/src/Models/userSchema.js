const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    user_loginId: {
        type: mongoose.Types.ObjectId,
        ref: 'login',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    user_img: {
        type: String,
        required: true
    }


})

module.exports = mongoose.model('user', userSchema)