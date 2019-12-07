const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())
app.use('/api/users', userRouter)
app.use('/api/tasks', taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


// const Task = require('./models/task')
// const User = require('./models/user')
// const main = async() => {
// const task = await Task.findById("5deb92964506ed2fac35c8d2")
// await task.populate('owner').execPopulate()
// console.log(task)

// const user = await User.findById("5deb8e659a33ab3dc829b101")
// await user.populate('tasks').execPopulate()
// console.log(user.tasks)
// }

//main()

//Postman Script
// if(pm.response.code === 201){
//     pm.environment.set('authToken',pm.response.json().token)
// }