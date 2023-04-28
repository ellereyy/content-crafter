/*--------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/api/users`
--------------------------------------*/

/* Require modules
--------------------------------------------------------------- */
const jwt = require('jwt-simple')
const express = require('express')
// Router allows us to handle routing outisde of server.js
const router = express.Router()

/* Require the db connection and models
--------------------------------------------------------------- */
const db = require('../models')

/* Require the JWT config
--------------------------------------------------------------- */
const config = require('../../jwt.config.js')

/* Middleware that checks if a JWT sent from the client is valid.
--------------------------------------------------------------- */
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        try {
            const decodedToken = jwt.decode(token, config.jwtSecret);
            req.user = decodedToken;
            next();
        } catch (err) {
            res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        res.status(401).json({ message: 'Missing or invalid Authorization header' });
    }
};

/* Routes
-------------------------------------- */
// SIGN UP ROUTE (create user)
router.post('/signup', (req, res) => {
    db.User.create(req.body)
        .then(user => {
            const token = jwt.encode({ id: user.id }, config.jwtSecret)
            res.json({ token: token })
        })
        .catch(() => {
            res.sendStatus(401)
                .json({ data: 'Could not create a new user, try again' })
        })
})

// LOG IN (log into a user account)
router.post('/login', async (req, res) => {
    const foundUser = await db.User.findOne({ email: req.body.email })
    if (foundUser && foundUser.password === req.body.password) {
        const payload = { id: foundUser.id }
        const token = jwt.encode(payload, config.jwtSecret)
        res.json({
            token: token,
            email: foundUser.email
        })
    } else {
        res.sendStatus(401)
    }
})

// show the logged in user
router.get('/', async (req, res) => {
    try {
        const decodedToken = jwt.decode(req.headers.authorization, config.jwtSecret)
        const userId = decodedToken.id
        const foundUser = await db.User.findById(userId)
        if (foundUser) {
            res.json(foundUser)
        } else {
            res.sendStatus(404)
        }
    } catch (error) {
        res.sendStatus(401)
    }
})

// router.get('/:id', function (req, res) {
//     db.Post.findById(req.params.id)
//         .then(post => res.json(post))
// })

router.put('/:id', (req, res) => {
    db.User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(updatedUser => res.json(updatedUser))
})

// update the user model 
// router.put('/:id', async (req, res) => {
//     const userProfile = await db.User.findById(req.params.id)
//     if (userProfile.userId == req.user.id) {
//         // If it is the original author, update the comment
//         const newUser = await db.User.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true }
//         )
//         res.json(newUser)
//     } else {
//         res.status(401).json({ message: 'Invalid user or token' });
//     }
// })

/* Export these routes so that they are accessible in `server.js`
-------------------------------------- */
module.exports = router






// edit the user model
// router.put('/:id', (req, res) => {
//     db.User.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         { new: true }
//     )
//         .then(updatedUser => res.json(updatedUser))
// })


// router.post('/signup', (req, res) => {
//     // Create a new user
//     db.User.create(req.body)
//         .then(user => {
//             // if the database creates a user successfully, assign a JWT to the user and send the JWT as the response
//             const token = jwt.encode({ id: user.id }, config.jwtSecret)
//             res.json({ token: token })
//         })
//         // send an error if the database fails to create a user
//         .catch(() => {
//             res.sendStatus(401)
//                 .json({ data: 'Could not create a new user, try again' })
//         })
// })

// // LOG IN (log into a user account)
// router.post('/login', async (req, res) => {
//     // attempt to find the user by their email in the database
//     const foundUser = await db.User.findOne({ email: req.body.email })
//     // check to:
//     // 1. make sure the user was found in the database
//     // 2. make sure the user entered in the correct password
//     if (foundUser && foundUser.password === req.body.password) {
//         // if the above applies, send the JWT to the browser
//         const payload = { id: foundUser.id }
//         const token = jwt.encode(payload, config.jwtSecret)
//         res.json({
//             token: token,
//             email: foundUser.email
//         })
//         // if the user was not found in the database OR their password was incorrect, send an error
//     } else {
//         res.sendStatus(401)
//     }
// })