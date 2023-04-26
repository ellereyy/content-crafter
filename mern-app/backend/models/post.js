const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
    image: { type: String, required: false },
    description: { type: String, required: false },
    caption: { type: String, required: false },
    hashtags: { type: String, required: false },
    date: { type: Date, required: false },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);