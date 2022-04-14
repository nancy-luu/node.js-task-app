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

// GET /tasks - both incomplete andd complete 
// GET /tasks?completed=true
// GET /tasks?limit=10&skip=0 
// limit - allows us to limit the results to a certain number 
// skip - iterate over pages. If skip 10 then get 10 you get the second set of 10
// GET /tasks?sortBy=createdAt_asc
router.get('/tasks', auth, async (req, res) => {
    // find({}) for all tasks
    const match = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    try {
        // alternative:
        // const tasks = await Task.find({ owner: req.user._id })
        // res.send(tasks)

        // customize and object based on the query strings
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort: {
                    completed: -1
                }
            }
        }).execPopulate()
        res.send(req.user.tasks)
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

router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        // findById only takes into account the Id of the task. We also need to filter with owner.
        // const task = await Task.findByIdAndDelete(_id)
        const task = await Task.findOneAndDelete({ _id: _id, owner: req.user._id})

        if (!task) {
            res.status(400).send()
        }
        
        res.send(task)

    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router