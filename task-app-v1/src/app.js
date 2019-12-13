
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const taskRouter = require('./routes/task')

const app = express()
app.use(express.static('public'))

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'./views'))


app.use(bodyParser.urlencoded({extended:true}))

app.use('/',taskRouter)


app.listen(3000, () => {
  console.log('Server listens in port 3000')
})