const express = require('express')
const Joi = require('joi')

const router = express()
//const router = express().router()

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

router.route('/').get((req, res) => {
    res.send(genres)
})

//GET specific Generas
router.route('/:id').get((req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if (!genre) {
        return res.status(400).send({
            error: 'Genre Not Available'
        })
    }
    res.send(genre)
})

//POST Genres
router.route('/').post((req, res) => {
    //Validate payload
    const validated = validateGenre(req.body)
    if (validated.error) {
        return res.status(400).send({
            error: validated.error.details[0].message
        })
    }

    //Insert Genre
    const id = genres.length + 1
    const genre = {
        id,
        name: req.body.name
    }
    genres.push(genre)

    //return new Genre
    res.status(201).send(genre)
})

//PUT Genres
router.route('/:id').put((req, res) => {
    //Validate payload
    const validated = validateGenre(req.body)
    if (validated.error) {
        return res.status(400).send({
            error: validated.error.details[0].message
        })
    }

    //Check input genre id exists in store
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send({
        error: 'Genre not found'
    })

    //Update Genre
    genre.name = req.body.name
    res.status(200).send(genre)

})

//DELETE Generes
router.route('/:id').delete((req, res) => {
    //Check input genre id exists in store
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send({
        error: 'Genre not found'
    })

    //Remove genre
    const index = genres.indexOf(genre)
    genres.splice(index, 1)

    res.status(200).send(genre)
})


function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required().alphanum()
    }
    return Joi.validate(genre, schema)
}

module.exports = router