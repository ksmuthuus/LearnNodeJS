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

router.patch('/:id', async (req, res) => {
    const updateFields = Object.keys(req.body)
    const allowedFields = ['name', 'email', 'password']
    const isUpdateAllowed = updateFields.every(field => allowedFields.includes(field))
    if (!isUpdateAllowed) {
        return res.status(400).send('Invalid Request')
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if (!user) {
        return res.status(400).send()
    }

    return res.status(200).send(user)
})


router.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).send('User Not Found!')
    res.status(200).send(user)
})

module.exports = router