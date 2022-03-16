require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('622fb6b1f1784f29fc4ed7db', { age: 1 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1 })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeandCount = async (id, age) => {
    // const user = await User.findByIdAndUpdate(id, { age: age }) - es6 can destructure
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count 
}

updateAgeandCount('622fb6b1f1784f29fc4ed7db', 2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})

