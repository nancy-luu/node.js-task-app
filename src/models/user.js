const mongoose = require('mongoose')
const validator = require('validator')
const chalk = require('chalk')

const errorHighLight = chalk.bold.red.inverse

// defining model
const User = mongoose.model('User', {
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

module.exports = User