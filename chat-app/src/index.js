const express = require('express')
const path = require('path')
const socketio = require('socket.io')
const http = require('http')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const publicDirPath = path.join(__dirname, '../public')
app.use(express.static(publicDirPath))

let count = 0
io.on('connection', (socket) => {
  console.log('New WS connection!')

  socket.emit('message', 'Welcome to live Chat..You are now connected..')

  socket.on('sendMessage', (message) => {
    //console.log(message)
    io.emit('message', message)
  })

  // socket.emit('countUpdated', count)

  // socket.on('incremented', () => {
  //   count++
  //   io.emit('countUpdated', count)
  // })
})

const port = process.env.NODE_PORT || 3000
server.listen(port, () => {
  console.log('Server is running and listening on port ', port)
})