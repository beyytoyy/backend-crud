const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

}, { versionKey: false});

module.exports = mongoose.model('User', Schema)

