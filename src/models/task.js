const mongoose = require('mongoose');
const chalk = require('chalk');
const bcrypt = require('bcryptjs');

const errorHighLight = chalk.bold.red.inverse

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // allows us to reference the User model
        ref: 'User'
    }
}, {
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task