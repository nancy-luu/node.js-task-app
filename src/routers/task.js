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

router.get('/tasks', async (req, res) => {

    // find({}) for all tasks
    try {
        const tasks = await Task.find({})
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


router.patch('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    const appliedUpdates = req.body

    // validates updates being performed:
    const updates = Object.keys(appliedUpdates)
    const allowedUpdates = [ 'description' , 'completed' ]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    // is validations do not pass then code stops at error
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findById(_id)
        // const user = await Task.findByIdAndUpdate(_id, appliedUpdates, { new: true, runValidators: true })

        updates.forEach((update) => {
            task[update] = req.body[update]
        })
        await task.save()

        if(!task) {
            return res.status(404).send()
        }

        res.send(task)

    } catch (e) {
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