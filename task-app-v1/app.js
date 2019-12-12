
const express = require('express')
const bodyParser = require('body-parser')
const taskRouter = require('./routes/task')

const app = express()

app.set('view engine','ejs')

app.use(bodyParser.urlencoded({extended:true}))

app.use('/',taskRouter)


app.listen(3000, () => {
  console.log('Server listens in port 3000')
})