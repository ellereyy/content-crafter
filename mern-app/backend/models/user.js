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
    name: { type: String },
    handle: { type: String },
    goals: { type: String }
})

module.exports = mongoose.model('User', UserSchema)
