const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req, res) => {
    const user = new User(req.body)
    
    user.save().then(() => {
        res.status(201).send(user)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

app.get('/users', (req, res) => {
    // empty object => all users in database
    User.find({}).then((users) => {
        res.status(200).send(users)
    }).catch((error) => {
        res.status(500).send(error)
    })
})

app.get('/users/:id', (req, res) => {
    const _id = req.params.id

    User.findById(_id).then((user) => {
        if (!user) {
            // console.log('should send 404')
            return res.status(404).send()
        }

        res.send(user)

    }).catch((error) => {
        // console.log('should send 505')
        res.status(500).send()
    })
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() =>{
        res.status(201).send(task)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

app.get('/tasks', (req, res) => {

    Task.find({}).then((tasks) => {
        res.status(200).send(tasks)
    }).catch((erorr) => {
        res.status(500).send()
    })

})

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id

    Task.findById(_id).then((task) => {
        if (!task) {
            res.status(4004).send()
        }
        res.send(task)

    }).catch((error) => {
        res.status(500).send()
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})

