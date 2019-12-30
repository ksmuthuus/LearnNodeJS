const socket = io()

const submitElement = document.querySelector('#send')
const welcomeElement = document.querySelector('#welcome')

document.querySelector('#main').addEventListener('submit', (e) => {
  e.preventDefault()
  const message = e.target.elements.message.value
  socket.emit('sendMessage', message)
})

socket.on('message', (message) => {
  //welcomeElement.textContent = message
  console.log(message)
})

// socket.on('receivemessage', (message) => {
//   console.log(message)
// })
// socket.on('countUpdated', (count) => {
//   console.log('Counter set to', count)
// })

// document.getElementById('increment').addEventListener('click', () => {
//   //console.log('Clicked')
//   socket.emit('incremented')
// })