// index.js creates the expresss application
// what express actually does is in the seperate router files
const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const chalk = require('chalk')
const noteHighlight = chalk.bold.green.inverse


const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//     // console.log(noteHighlight(req.method, req.path))
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         // ensures all other route handlers to run
//         next()
//     }
// })

//  MAINTENANCE MIDDLEWARE  
// app.use((req, res, next) => {
//     if (req.method) {
//         res.status(503).send('The site is under maintenance. Please come back soon.')
//     } 
// })

app.use(express.json())
// register the route with the express application
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port' + port)
})

// 
// Without middleware: new request -> run route handler
// 
// With middleware: new request -> do something (a function that runs) -> run route handler
// 

// Original login 
// const bcrypt = require('bcryptjs')

// const myFunction = async () => {
//     const password = 'Red12345!'
//     const hashedPassword = await bcrypt.hash(password, 8)
    
//     console.log(password)
//     console.log(hashedPassword)

//     const isMatch = await bcrypt.compare('Red12345!', hashedPassword)
//     console.log(isMatch)

//     // will result in false
//     const isMatch2 = await bcrypt.compare('nope', hashedPassword)
//     console.log(isMatch2)
// }

// JWT Login
// const jwt = require('jsonwebtoken');


// const myFunction = async () => {
//     // second argument is a secret (random series of characters) / signs token
//     // third argument is an object with options
//     const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn :  '7 days'})
    
//     console.log(noteHighlight('Token:'))
//     console.log(token)

//     // secret needs to be the same to authenticate user
//     console.log(noteHighlight('Verified Data:'))
//     const data = jwt.verify(token, 'thisismynewcourse')
//     console.log(data)
// }

// myFunction()


// toJSON example
// const pet = {
//     name: 'Hal'
// }

// pet.toJSON = function () {
//     // console.log(this)
//     return {}
// }

// console.log(JSON.stringify(pet))


// Task router examples
// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () => {
//     // const task = await Task.findById('624f2ebab1c04ff1b0e485ef')
//     // // populate allows us to populate data from a relationship 
//     // // bring it from being just the ID to show the entire profile
//     // await task.populate('owner').execPopulate()
//     // console.log(noteHighlight(task.owner.name))

//     const user = await User.findById('624f2c479e1789eb60888b28')
//     // populate the virtual field in user model
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }
 
// main()
