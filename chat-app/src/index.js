const express = require('express')
const path = require('path')
const socketio = require('socket.io')
const http = require('http')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const publicDirPath = path.join(__dirname, '../public')
app.use(express.static(publicDirPath))

io.on('connection', () => {
  console.log('New WS connection!')
})

const port = process.env.NODE_PORT || 3000
server.listen(port, () => {
  console.log('Server is running and listening on port ', port)
})