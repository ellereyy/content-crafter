/* 
---------------------------------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/posts`
---------------------------------------------------------------------------------------
*/


/* Require modules
--------------------------------------------------------------- */
const express = require('express')
const router = express.Router()


/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require('../models')


/* Routes
--------------------------------------------------------------- */
// Index Route (GET/Read)
router.get('/', function (req, res) {
    db.Post.find({})
        .then(posts => res.json(posts))
})

// Create Route (POST/Create)
router.post('/', (req, res) => {
    db.Post.create(req.body)
        .then(post => res.json(post))
})

// Show Route (GET/Read) 
router.get('/:id', function (req, res) {
    db.Post.findById(req.params.id)
        .then(post => res.json(post))
})

// Update Route (PUT/Update)
router.put('/:id', (req, res) => {
    db.Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(post => res.json(post))
})

// Destroy Route (DELETE/Delete)
router.delete('/:id', (req, res) => {
    db.Post.findByIdAndRemove(req.params.id)
        .then(() => res.send('You deleted post ' + req.params.id))
})


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router
