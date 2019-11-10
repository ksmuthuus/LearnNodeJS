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