require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('622bdb8a04c6ad77995ba8ed').then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    const deletedTask = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('622fcbbe77f71435cf9c9fca').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})