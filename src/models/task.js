const mongoose = require('mongoose');
const chalk = require('chalk');

const errorHighLight = chalk.bold.red.inverse

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = Task