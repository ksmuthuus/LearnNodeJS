const mongoose = require('mongoose')
const Joi = require('joi')

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15
    }
})


exports.Genre = mongoose.model('Genre', genreSchema)


exports.validate = (genre) => {
    const schema = {
        name: Joi.string().min(3).required().alphanum()
    }
    return Joi.validate(genre, schema)
}