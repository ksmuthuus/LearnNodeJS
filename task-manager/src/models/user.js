const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')

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

//Pre Save Middleware
userSchema.pre('save', async function(next) {
    const user = this
    user.password = await bcryptjs.hash(user.password,8)
    next()
})

const User = mongoose.model('User', userSchema)



module.exports = User