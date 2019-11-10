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

module.exports = router