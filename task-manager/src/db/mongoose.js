const mongoose = require('mongoose')
const connUrl = 'mongodb://localhost:27017/TaskManager'

mongoose.connect(connUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).catch(err => {
    console.log('Failed to connect mongodb: ', err)
})