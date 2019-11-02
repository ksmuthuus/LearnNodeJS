const express = require('express')
const Joi = require('joi')

const app = express()

const genres = [{
    id: 1,
    name: 'Action'
}, {
    id: 2,
    name: 'Comedy'
}, {
    id: 3,
    name: 'Thriller'
}]

//GET All Generas
app.get('/api/genres', (req, res) => {
    res.send(genres)
})

//GET specific Generas
app.get('/api/genre/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if (!genre) {
        return res.status(400).send('Genre Not Available')
    }
    res.send(genre)
})

//POST Genres


//PUT Genres


//DELETE Generes


//handle Invalid paths
app.get('*', (req, res) => {
    res.status(400).send('Invalid Request')
})


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})