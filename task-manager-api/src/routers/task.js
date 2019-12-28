const express = require('express')
const router = express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')

router.get('/', auth, async (req, res) => {
    try{
        // const tasks = await Task.find({owner:req.user._id})
        // res.status(200).send(tasks)

        //Alternate way
        await req.user.populate('tasks').execPopulate()
        res.status(200).send(req.user.tasks)
    }
    catch(err){
        res.status(500).send(err.message)
    }   
})

router.get('/:id', auth, async (req, res) => {
    try{
        const tasks = await Task.findOne({_id:req.params.id, owner:req.user._id})
        if(!tasks){
            res.status(404).send()
        }
        res.status(200).send(tasks)
    }
    catch(err){
        res.status(500).send(err)
    }
})

router.post('/', auth, async (req, res) => {
    const task = new Task({...req.body,owner:req.user._id})
    try{
        await task.save()    
    }
    catch(err){
        res.status(500).send(err)
    }
    res.status(201).send(task)
})

router.patch('/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedupdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedupdates.includes(update))
    if (!isValidOperation)
        return res.status(400).send({
            error: 'Invlaid updates!'
        })
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //     new: true
    // })

    const task = await Task.findOne({_id: req.params.id, owner: req.user._id})

    if (!task) {
        return res.status(404).send('Not Found')
    }

    updates.forEach(field => task[field] = req.body[field]);
    try{
        await task.save()
        res.status(200).send(task)
    }
    catch(err)
    {
        res.status(500).send(err)
    }
})


router.delete('/:id', auth, async (req, res) => {
    try{
        // const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({_id: req.params.id, owner:req.user._id})
        if (!task) return res.status(404).send('Task Not Found!')
        res.status(200).send(task)
    }
    catch(err){
        res.status(500).send(err)
    }
})

module.exports = router