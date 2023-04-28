const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	email: { 
        type: String,
        unique: true,
        required: true
    },
	password: { 
        type: String, 
        minlength: 6,
        required: true,
    },
})

module.exports = mongoose.model('User', UserSchema)


// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY0NGFkNTlmOWYxZTAyODk0MzIyNjY0YiJ9._xm9KOW1oTsBxejm9VJ_NV39EZ1_wJTqHQKYoKZFjrM

// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY0NGFkNTlmOWYxZTAyODk0MzIyNjY0YiJ9._xm9KOW1oTsBxejm9VJ_NV39EZ1_wJTqHQKYoKZFjrM

// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY0NGFkNDNhMWJkYTZhODM0NDBhZTVhYSJ9.g1FLSaK3XJD8bP0bUsI-DG2TGNNGm9tYwppp10gyEYY

// 