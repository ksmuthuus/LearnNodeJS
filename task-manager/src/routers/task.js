const express = require('express')
const router = express.Router()

const Task = require('../models/task')

router.get('/', async (req, res) => {
    const tasks = await Task.find()
    res.status(200).send(tasks)
})

router.post('/', async (req, res) => {
    const task = new Task({
        description: req.body.description,
        completed: req.body.completed
    })
    const addedTask = await task.save()
    res.status(201).send(addedTask)
})

router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedupdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedupdates.includes(update))
    if (!isValidOperation)
        return res.status(400).send({
            error: 'Invlaid updates!'
        })
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    if (!task) {
        return res.status(404).send('Not Found')
    }

    res.status(200).send(task)
})


router.delete('/:id', async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) return res.status(404).send('Task Not Found!')
    res.status(200).send(task)
})

module.exports = router