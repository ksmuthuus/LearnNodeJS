const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
        trim: true,
        index: {unique:true},
        // validate(value): {
        //     if (!validator.isEmail(value)) {
        //         throw new Error('Email is invalid!')
        //     }
        // }
    },
    password: {
        type: String,
        minlength: 8,
        required: true
    },
    age: {
        type: Number,
        default: 0,
        // validate(value) {
        //     if (value < 0) {
        //         throw new Error('Age must be a postive number')
        //     }
        // }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.virtual('tasks',{
    ref: 'Task',
    localField:'_id',
    foreignField:'owner'
})

//Pre Save Middleware
userSchema.pre('save', async function(next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcryptjs.hash(user.password, 8)
        user.tokens=[]
    }

    next()
})

userSchema.methods.toJSON = function(){
    const user = this.toObject()
    delete user.password
    delete user.tokens
    return user
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcryptjs.compare(password, user.password)
    console.log('Match: ',isMatch)
    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

const User = mongoose.model('User', userSchema)



module.exports = User