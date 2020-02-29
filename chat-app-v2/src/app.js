const express = require('express')

const app = express()
const wwwPath = __dirname +'/public'
app.use(express.static(wwwPath))
app.use('/',(req, res) => {
  res.sendFile('chats.html',{root:wwwPath})
})

app.listen(3000,() => {
  console.log('Server is running....')
})