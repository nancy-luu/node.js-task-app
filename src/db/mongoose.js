const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useFindAndModify: false
})


// creating instance
// const me = new User({
//     name: 'Nancy', 
//     email: 'nancy@nancy.com',
//     age: 29,
//     password: '1234567'
// })

// me.save().then((me) => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error', error)
// })

// const ru = new User({
//     name: 'Ru    ', 
//     email: '   ru@gmail.com  ',
//     password: 'password'
// })

// ru.save().then((ru) => {
//     console.log(ru)
// }).catch((error) => {
//     console.log('Error', error)
// })


// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// })

// const coding = new Task({
//     description: 'practice node.js', 
//     completed: true,
// })

// coding.save().then((coding) => {
//     console.log(coding)
// }).catch((error) => {
//     console.log('Error', error)
// })

// const running = new Task({
//     description: '   15 mile trail run   '
// })

// running.save().then((running) => {
//     console.log(running)
// }).catch((error) => {
//     console.log('Error', error)
// })