const mongoose = require('mongoose')
const connUrl = process.env.MONGODB_URL
mongoose.connect(connUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).catch(err => {
    console.log('Failed to connect mongodb: ', err)
})