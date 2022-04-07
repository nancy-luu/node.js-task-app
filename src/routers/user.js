const express = require('express');
const User = require('../models/user')
const auth = require('../middleware/auth')
// create a new router
const router = new express.Router()


router.post('/users', async (req, res) => {
    const user = new User(req.body)
    
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }

})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user: user.getPublicProfile(), token })
    } catch (e) {
        res.status(400).json({error: e.message})
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            // if the tokens are not equal -> we will return true and keep it in the tokens array
            // if they are equal -> we will return false and filter it out to remove it 
            return token.token !== req.token
        }) 
        await req.user.save()

        res.send()

    } catch (e) {
        res.status(500).send()
    }
})
   
// delete all sessions of logged in account
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        // wiping out all tokens in the tokens array of the user object
        req.user.tokens = []
        await req.user.save()

        res.send()

    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.get('/users', auth, async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (e){
        res.status(500).send()
    }
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/users/:id', async (req, res) => {
    const _id = req.params.id
    // .keys will return an array of strings where each is a property on that object
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) =>  allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findById(_id)

        // make sure our middleware runs correctly
        updates.forEach((update) => {
            // bracket notation to access property dynamically instead of dot notation
            user[update] = req.body[update]
        })
        await user.save()

        // new: true returns the new user as opposed to the existing one before the update (gives us latest data)
        // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true})
        
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)

    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findByIdAndDelete(_id)

        if (!user) {
            return res.status(400).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})


// export the route from the express module
module.exports = router