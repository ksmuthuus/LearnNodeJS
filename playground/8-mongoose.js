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
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 25,
        //match: /pattern/
    },
    category: {
        type: String,
        required: true,
        enum: ['app', 'web']
    },
    tutor: String,
    tags: {
        type: Array,
        validate: {
            validator: function (v) {
                return v && v.length > 0
            },
            message: 'Tag should have atleast one value'
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () {
            return this.isPublished
        }
    }
})

const Course = mongoose.model('Course', courseSchema)

async function createDocument() {
    const course = new Course({
        //name: 'Angular',
        //category: 'app',
        tutor: 'Mosh',
        //tags: ['angular', 'frontend'],
        isPublished: true,
        //price: 10
    })

    try {
        await course.save()
    } catch (err) {
        for (filed in err.errors)
            console.log(err.errors[filed].message)
    }
}

createDocument()

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

//queryDocumentFilter()