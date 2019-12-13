const express = require('express')
const date = require('../modules/date')

const router = express.Router()


var listItems = []

router.get('/', (req, res) => {
  const today = date.getDate()
  //res.sendFile(__dirname+'/index.html')
  res.render('list',{today, listItems})
  
})

router.post('/',(req, res) => {
  const item = req.body.newItem
  if(item)
  listItems.push(item)
  res.redirect('/')
})

module.exports = router