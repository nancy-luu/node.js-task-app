require('../src/db/mongoose')
const User = require('../src/models/user')

User.findByIdAndUpdate('622fb6b1f1784f29fc4ed7db', { age: 1 }).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 1 })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})
