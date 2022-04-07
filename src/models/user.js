const mongoose = require('mongoose')
const validator = require('validator')
const chalk = require('chalk')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const errorHighLight = chalk.bold.red.inverse

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        // dropDups: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// virtual property
// not stored in the database - just for mongoose to be able to figure out who owns what and how theyre related
userSchema.virtual('tasks', { 
    ref: 'Task',
    // relationship of task belonging to a certain user property
    localField: '_id',
    // relationship declared on task
    foreignField: 'owner'
})

// custom methods on instance of User
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')

    user.tokens = user.tokens.concat({ token: token })
    await user.save()

    return token
}

// toJSON send back a manipulated object 
userSchema.methods.toJSON = function () {
    const user = this

    // we want back an object with just our user data
    const userObject = user.toObject()

    // remove the following from the object as a response
    delete userObject.password
    delete userObject.tokens

    return userObject
}

// statics function on entire Model of User
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    // needed to remove below in order to login with postman
    if (!user) {
        throw new Error(errorHighLight('Unable to login!'))
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error(errorHighLight('Unable to login!'))
    }

    return user 
}


// hash plaintext password before saving
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