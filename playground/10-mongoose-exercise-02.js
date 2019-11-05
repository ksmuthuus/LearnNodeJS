const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017/mongoose-exercises'

mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .catch((err) => {
        console.log(`Error: ${err}`)
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

async function getAllPublishedCourses() {
    return Course
        // .find({
        //     tags: {
        //         $in: ['frontend', 'backend']
        //     },
        //     isPublished: true
        // })
        .find({
            isPublished: true
        })
        .or([{
            tags: 'frontend'
        }, {
            tags: 'backend'
        }])
        .sort({
            price: -1
        })
    // .select({
    //     name: 1,
    //     author: 1
    // })
}

async function run() {
    try {
        const course = await getAllPublishedCourses()
        console.log(course)
    } catch (err) {
        console.log(`Error: ${err}`)
    }

}

run()