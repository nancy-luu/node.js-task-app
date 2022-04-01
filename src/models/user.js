const mongoose = require('mongoose')
const validator = require('validator')
const chalk = require('chalk')
const bcrypt = require('bcryptjs')

const errorHighLight = chalk.bold.red.inverse

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error(errorHighLight('Invalid email'))
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if (value < 0) {
                throw new Error(errorHighLight('Age must be greater than zero!'))
            }
        }
    },
    password: {
        type: String,
        require: true,
        trim: true,
        minLength: 6,
        validate(value){
            if (value.toLowerCase().includes('password')) {
                throw new Error(errorHighLight('Cannot contain password'))
            }
        }
    }
})

// middleware allows us to enforce the hashing of passwords
// provide once and works everywhere
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password'))  {
        user.password = await bcrypt.hash(user.password, 8)
    }
    
    next()
})

// defining model
const User = mongoose.model('User', userSchema)

module.exports = User