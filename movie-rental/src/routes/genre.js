const express = require('express')
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')
const {
    returnError
} = require('../common/error')
const {
    Genre,
    validate
} = require('../models/genre')

const router = express.Router()

//GET All Generas

router.get('/', async (req, res) => {
    let genres = undefined
    try {
        genres = await Genre.find().sort('name')
    } catch (err) {
        returnError(res, 400, 'StorageException', err.message)
    }

    res.status(200).send(genres)
})

//GET specific Generas
router.get('/:id', async (req, res) => {
    let genre = undefined
    try {
        genre = await Genre.findById(req.params.id)
    } catch (err) {
        returnError(res, 400, 'StorageException', err.message)
    }

    if (!genre) {
        returnError(res, 400, 'DataException', 'Genre Not Available')
    }
    res.status(200).send(genre)
})

//POST Genres
router.post('/', auth, async (req, res) => {
    //Validate payload
    const validated = validate(req.body)
    if (validated.error) {
        returnError(res, 400, 'ValidationException', validated.error.details[0].message) //TO DO enumerate details
    }

    //Insert Genre
    const genre = new Genre({
        name: req.body.name
    })

    let addedGenre = undefined
    try {
        addedGenre = await genre.save()
    } catch (err) {
        returnError(res, 400, 'StorageException', err.message)
    }

    res.status(201).send(addedGenre)
})

//PUT Genres
router.put('/:id', async (req, res) => {
    //Validate payload
    const validated = validate(req.body)
    if (validated.error) {
        returnError(res, 400, 'ValidationException', validated.error.details[0].message) //TO DO enumerate details
    }

    let resultGenre = undefined
    try {
        resultGenre = await Genre.findByIdAndUpdate(req.params.id, {
            name: req.body.name
        }, {
            new: true
        })
    } catch (err) {
        returnError(res, 400, 'StorageException', err.message)
    }
    if (!resultGenre)
        returnError(res, 404, 'DataException', 'Genre Not Found')

    //Update Genre
    res.status(200).send(resultGenre)
})

//DELETE Generes
router.delete('/:id', [auth, admin], async (req, res) => {
    var resultGenre = undefined
    try {
        resultGenre = await Genre.findByIdAndRemove(req.params.id)

    } catch (err) {
        returnError(res, 400, 'StorageException', err.message)
    }

    if (!resultGenre) returnError(res, 404, 'DataException', 'Genre Not Found')

    //Remove genre
    res.status(200).send(resultGenre)

})



module.exports = router