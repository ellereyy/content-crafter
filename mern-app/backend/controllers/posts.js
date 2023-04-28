/* ---------------------------------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/api/posts`
---------------------------------------------------------------------------------------*/

/* Require modules
--------------------------------------------------------------- */
const jwt = require('jwt-simple');
const express = require('express');
const router = express.Router();


/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require('../models')


/* Require the JWT config
--------------------------------------------------------------- */
const config = require('../../jwt.config.js')


/* Middleware that checks if a JWT sent from the client is valid.
--------------------------------------------------------------- */
const authMiddleware = (req, res, next) => {
    // Check if the 'Authorization' header is present and has the token
    const token = req.headers.authorization;
    if (token) {
        try {
            // Decode the token using the secret key and add the decoded payload to the request object
            const decodedToken = jwt.decode(token, config.jwtSecret);
            req.user = decodedToken;
            next();
        } catch (err) {
            // Return an error if the token is invalid
            res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        // Return an error if the 'Authorization' header is missing or has the wrong format
        res.status(401).json({ message: 'Missing or invalid Authorization header' });
    }
};

/* Routes
--------------------------------------------------------------- */
// Index Route (GET/Read)
router.get('/', authMiddleware, function (req, res) {
    const userId = req.user.id
    db.Post.find({ userId })
        .then(posts => res.json(posts))
})

// Create Route (POST/Create)
router.post('/', authMiddleware, (req, res) => {
    db.Post.create({
        ...req.body,
        userId: req.user.id
    })
        .then(post => res.json(post))
})

// Show Route (GET/Read) 
router.get('/:id', function (req, res) {
    db.Post.findById(req.params.id)
        .then(post => res.json(post))
})

// JWT Update Route (PUT/update)
router.put('/:id', authMiddleware, async (req, res) => {
    // Check if the user who sent the update request is the same user who created the comment
    const userContent = await db.Post.findById(req.params.id)
    if (userContent.userId == req.user.id) {
        // If it is the original author, update the comment
        const newContent = await db.Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.json(newContent)
    } else {
        res.status(401).json({ message: 'Invalid user or token' });
    }
})

// JWT Destroy Route (DELETE/Delete)
router.delete('/:id', authMiddleware, async (req, res) => {
    // Check if the user who sent the delete request is the same user who created the comment
    const userContent = await db.Post.findById(req.params.id)
    if (userContent.userId == req.user.id) {
        const deletedContent = await db.Post.findByIdAndRemove(req.params.id)
        res.send('You deleted comment ' + deletedContent._id)
    } else {
        res.status(401).json({ message: 'Invalid user or token' });
    }
})

/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router



// // Destroy Route (DELETE/Delete)
// router.delete('/:id', authMiddleware, (req, res) => {
//     db.Post.findByIdAndRemove(req.params.id)
//         .then(() => res.send('You deleted post ' + req.params.id))
// })

// router.get('/', authMiddleware, async (req, res) => {
//     const userContent = await db.Post.findById(req.params.id) 
//     if (userContent.userId.toString() == req.user.id) {
//         db.Post.find({})
//             .then(posts => res.json(posts))
//     }
// })


// // Update Route (PUT/Update)
// router.put('/:id', (req, res) => {
//     db.Post.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         { new: true }
//     )
//         .then(post => res.json(post))
// })