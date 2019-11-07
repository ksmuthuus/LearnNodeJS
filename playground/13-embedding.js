const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    authors: [authorSchema]
}));

async function createCourse(name, authors) {
    const course = new Course({
        name,
        authors
    });

    const result = await course.save();
    console.log(result);
}

async function listCourses() {
    const courses = await Course.find();
    console.log(courses);
}


async function updateCourse(courseId) {
    // const course = await Course.findById(courseId)
    // course.author.name = 'Muthu'
    // console.log(await course.save())

    const course = await Course.update({
        _id: courseId
    }, {
        $set: {
            'author.name': 'Mosh'
        }
    })

    console.log(course)
}

async function addAuthors(courseId, author) {
    const course = await Course.findById(courseId)
    course.authors.push(author)
    await course.save()
}

async function removeAuthor(courseId, authorId) {
    const course = await Course.findById(courseId)
    const author = course.authors.id(authorId)
    author.remove()
    await course.save()
}

removeAuthor('5dc419669ecb5537f009d402',
    '5dc419f454e1503918d5790d')
// addAuthors('5dc419669ecb5537f009d402', new Author({
//     name: 'Raj'
// }))

// createCourse('Node Course', [
//     new Author({
//         name: 'Mosh'
//     }),
//     new Author({
//         name: 'Muthu'
//     })
// ]);

//updateCourse('5dc4155c88fdcb1e80e51786')