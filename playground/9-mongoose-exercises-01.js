const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/mongoose-exercises'

mongoose.connect(url, {
        useNewUrlParser: true
    })
    .catch((err) => {
        console.log('Error: ', err)
    })

const courseSchema = mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean,
    price: Number
})

const Course = mongoose.model('Course', courseSchema)

//Get all published backend courses
async function getAllPublishedBackendCourses() {
    return await Course
        .find({
            isPublished: true,
            tags: 'backend'
        })
        .sort({
            name: 1
        })
        .select({
            name: 1,
            author: 1
        })
}

async function run() {
    const courses = await getAllPublishedBackendCourses()
    console.log(courses)
}

run()