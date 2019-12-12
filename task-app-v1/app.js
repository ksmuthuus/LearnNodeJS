
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine','ejs')

app.use(bodyParser.urlencoded({extended:true}))

var listItems = []

app.get('/', (req, res) => {
  const date = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const today = date.toLocaleDateString('en-US', options);
    //res.sendFile(__dirname+'/index.html')
  res.render('list',{today, listItems})
  
})

app.post('/',(req, res) => {
  const item = req.body.newItem
  if(item)
    items.push(item)
  res.redirect('/')
})

app.listen(3000, () => {
  console.log('Server listens in port 3000')
})