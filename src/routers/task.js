const express = require('express');
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body)

    // adding owner/creator to Task to create association
    const task = new Task ({
        // copies all properties from body over to this object
        ...req.body,
        owner: req.user._id
    })

    try {
        const createUser = await task.save()
        res.status(201).send(createUser)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks', auth, async (req, res) => {

    // find({}) for all tasks

    try {
        // alternative:
        // await req.user.populate('tasks').execPopulate()
        // res.send(req.user.tasks)
        const tasks = await Task.find({ owner: req.user._id })
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    // url parameter
    const _id = req.params.id

    try {
        // const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        } 

        res.send(task)

    } catch (e) {
        res.status(500).send()
    }
}) 


router.patch('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    // to fix "must be a single String of 12 bytes or a string of 24 hex characters" error
    const _ids = _id.slice(0,24)
    const appliedUpdates = req.body

    // validates updates being performed:
    const updates = Object.keys(appliedUpdates)
    const allowedUpdates = [ 'description' , 'completed' ]
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    // is validations do not pass then code stops at error
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        // const task = await Task.findById(_id)
        // const user = await Task.findByIdAndUpdate(_id, appliedUpdates, { new: true, runValidators: true })
        const task = await Task.findOne({ _id: _ids, owner: req.user._id })
        
        if(!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])

        await task.save()

        res.send(task)

    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findByIdAndDelete(_id)

        if (!task) {
            res.status(400).send()
        }
        
        res.send(task)

    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router