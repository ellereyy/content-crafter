/* 
---------------------------------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/comments`
---------------------------------------------------------------------------------------
*/


/* Require modules
--------------------------------------------------------------- */
const express = require('express')
// Router allows us to handle routing outisde of server.js
const router = express.Router()


/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require('../models')


/* Routes
--------------------------------------------------------------- */
// Index Route (GET/Read): Will display all comments
router.get('/', function (req, res) {
    db.Post.find({})
        .then(comments => res.json(comments))
})

// Create Route (POST/Create): This route receives the POST request sent from the new route,
// creates a new post document using the form data, 
// and redirects the user to the new post's show page
router.post('/', (req, res) => {
    db.Post.create(req.body)
        .then(post => res.json(post))
})

// Show Route (GET/Read): Will display an individual post document
// using the URL parameter (which is the document _id)
router.get('/:id', function (req, res) {
    db.Post.findById(req.params.id)
        .then(post => res.json(post))
})

// Update Route (PUT/Update): This route receives the PUT request sent from the edit route, 
// edits the specified post document using the form data,
router.put('/:id', (req, res) => {
    db.Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(post => res.json(post))
})

// Destroy Route (DELETE/Delete): This route deletes a post document 
// using the URL parameter (which will always be the post document's ID)
router.delete('/:id', (req, res) => {
    db.Post.findByIdAndRemove(req.params.id)
        .then(() => res.send('You deleted post ' + req.params.id))
})


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router
