const jwt = require('jsonwebtoken');
const User = require('../models/user')


const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token' : token })

        if (!user) {
            // triggers catch down below
            throw new Error()
        }

        // route handlers will be able to access token variable from above
        req.token = token
        // route handlers will be able to access user variable from above
        req.user = user
        next()
 
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth