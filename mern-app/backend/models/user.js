const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    targetAudience: { type: String, required: false },
    brandPersonality: { type: String, required: false },
    competitors: { type: String, required: false },
    campaigns: { type: String, required: false },
});

module.exports = mongoose.model('User', userSchema);
