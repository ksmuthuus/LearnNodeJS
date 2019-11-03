const express = require('express')
const path = require('path')
const helmet = require('helmet')
const morgan = require('morgan')
const config = require('config')
const logger = require('./middlewares/logger')
const router = require('./routes/genre.js')

const app = express()
const staticFilePath = path.join(__dirname, '../public')

app.use(helmet())

if (app.get('env') !== 'production')
    app.use(morgan('tiny'))
//JSON Parser Middleware
app.use(express.json()) //Sets req.body
app.use(logger) //Custom Middleware
app.use(express.static(staticFilePath))
app.use('/api/genres', router)

//handle Invalid paths
app.get('*', (req, res) => {
    res.status(400).send({
        error: 'Invalid Request'
    })
})

const port = process.env.NODE_PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})