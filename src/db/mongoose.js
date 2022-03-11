const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true, 
    useCreateIndex: true
})

// defining model
// const User = mongoose.model('User', {
//     name: {
//         type: String
//     },
//     age: {
//         type: Number
//     }
// })

// // creating instance
// const me = new User({
//     name: 'Nancy', 
//     age: 29
// })

// me.save().then((me) => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error', error)
// })


const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const coding = new Task({
    description: 'Coding', 
    completed: true
})

coding.save().then((coding) => {
    console.log(coding)
}).catch((error) => {
    console.log('Error', error)
})
