const express = require('express')
const redis = require('redis')

const app = express()
const client = redis.createClient()
client.set('visit',0)

app.get('/visits',(req, res) => {
  client.get('visit',(err, visits) => {
    res.send('Numner of visits: ', visits)
    client.set('visit',parseInt(visits)+1)
  })
})

app.listen(8080, () => {
  console.log('Server is up and listens for requests...')
})