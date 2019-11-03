const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017/PlayGround01'
mongoose.connect(url, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('Success!')
    })
    .catch(err => {
        console.log('Error: ', err)
    })

const courseSchema = new mongoose.Schema({
    name: String,
    tutor: String,
    tags: [String],
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema)

async function createDocument() {
    const course = new Course({
        name: 'Angular',
        tutor: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true
    })

    await course.save()
}

//createDocument()

async function queryDocument() {
    const courses = await Course.find()
    console.log(courses)
}

//queryDocument()
async function queryDocumentFilter() {
    const courses = await Course
        .find({
            tutor: 'Mosh'
        })
        .limit(10)
        .sort({
            name: 1
        })
        .select({
            name: 1,
            tags: 2
        })

    console.log(courses)
}

queryDocumentFilter()