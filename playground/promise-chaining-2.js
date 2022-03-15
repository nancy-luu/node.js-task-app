require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('622bdb8a04c6ad77995ba8ed').then((task) => {
    console.log(task)
    return Task.countDocuments({ completed: false })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})