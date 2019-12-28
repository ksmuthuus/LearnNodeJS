const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient

const { MongoClient, ObjectId } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'taskmanager'


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Connection failed!')
    }
    const db = client.db(databaseName)

    // db.collection('tasks').insertMany([{
    //     description: 'Learn NodeJS',
    //     completed: false
    // }, {
    //     description: 'Learn GraphQL',
    //     completed: false
    // }], (error, result) => {
    //     if (error) {
    //         return console.log('Error ' + error)
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    //     console.log(tasks)
    // })

    db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})