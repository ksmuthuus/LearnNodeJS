const express = require('express')
const router = express.Router()
const User = require('../models/user')
const returnError = require('../common/error')

router.get('/', async (req, res) => {
    const users = await User.find()
    res.status(200).send(users)
})

router.post('/', async (req, res) => {
    const user = new User(req.body)
    let addedUser = undefined
    try {
        addedUser = await user.save()
    } catch (err) {
        returnError(res, 400, 'StorageException', err.message)
    }

    if (addedUser)
        res.status(201).send(addedUser)
})

module.exports = router