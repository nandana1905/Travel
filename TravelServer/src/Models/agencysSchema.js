const mongoose = require('mongoose')

const agencysSchema = new mongoose.Schema({

    agency_loginId: {
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
    agency_img: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('agency', agencysSchema)