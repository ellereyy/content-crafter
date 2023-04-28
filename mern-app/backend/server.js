/* Require modules
--------------------------------------------------------------- */
require('dotenv').config()
const express = require('express');
const cors = require('cors')
const path = require('path')


/* Require the db connection, models, and seed data
--------------------------------------------------------------- */
const db = require('./models');


/* Require the routes in the controllers folder
--------------------------------------------------------------- */
const postsCtrl = require('./controllers/posts')
const usersCtrl = require('./controllers/users')



/* Create the Express app
--------------------------------------------------------------- */
const app = express();


/* Configure the app (app.set)
--------------------------------------------------------------- */


/* Middleware (app.use)
--------------------------------------------------------------- */
// cross origin allowance
app.use(cors())
// body parser - used for POST/PUT/PATCH routes:
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
// use the React build folder for static files
app.use(express.static(path.join(path.dirname(__dirname), 'frontend', 'dist')))


/* Mount routes
--------------------------------------------------------------- */
// When a GET request is sent to `/seed`, the posts collection is seeded
app.get('/api/seed', function (req, res) {
    // Remove any existing posts
    db.Post.deleteMany({})
        .then(removedPosts => {
            console.log(`Removed ${removedPosts.length} posts`)

            // Seed the posts collection with the seed data
            db.Post.insertMany(db.seedPosts)
                .then(addedPosts => {
                    console.log(`Added ${addedPosts.length} posts`)
                    res.json(addedPosts)
                })
        })
});


// This tells our app to look at the `controllers/posts.js` file 
// to handle all routes that begin with `localhost:3000/posts`
app.use('/api/posts', postsCtrl)

// This tells our app to look at the `controllers/users.js` file 
// to handle all routes that begin with `localhost:3000/api/users`
app.use('/api/users', usersCtrl)


// add second file for other models (e.g. users)

// Any other route not matching the routes above gets routed by React
app.get('*', (req, res) => {
    res.sendFile(path.join(path.dirname(__dirname), 'frontend', 'dist', 'index.html'));
});


/* Tell the app to listen on the specified port
--------------------------------------------------------------- */
app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});
