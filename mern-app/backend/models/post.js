const mongoose = require('mongoose');

const inputSchema = new mongoose.Schema({
    image: { type: String, required: false },
    description: { type: String, required: false },
    caption: { type: String, required: false },
});