const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
// register the route with the express application
app.use(userRouter)


app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
                                             
    try {
        const createUser = await task.save()
        res.status(201).send(createUser)
    } catch (e) {
        res.status(400).send(e)
    }
}) 

app.get('/tasks', async (req, res) => {

    // find({}) for all tasks
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

app.get('/tasks/:id', async (req, res) => {
    // url parameter
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)

        if (!task) {
            return res.status(404).send()
        } 

        res.send(task)

    } catch (e) {
        res.status(500).send()
    }
}) 

app.patch('/tasks/:id', async (req, res) => {
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
        const user = await Task.findByIdAndUpdate(_id, appliedUpdates, { new: true, runValidators: true })

        if(!user) {
            return res.status(404).send()
        }

        res.send(user)

    } catch (e) {
        res.status(400).send(e)
    }
})

app.delete('/tasks/:id', async (req, res) => {
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

app.listen(port, () => {
    console.log('Server is up on port' + port)
})

