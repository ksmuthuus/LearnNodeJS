const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        trim: true
        // validate(value): {
        //     if (!validator.isEmail(value)) throw new Error('Email is invalid!')
        // }
    },
    password: {
        type: String,
        minlength: 8,
        required: true
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User