const express = require('express')
const router = express.Router()


var listItems = []

router.get('/', (req, res) => {
  const date = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const today = date.toLocaleDateString('en-US', options);
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