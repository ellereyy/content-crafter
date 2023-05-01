const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
    image: { type: String, required: false },
    description: { type: String, required: false },
    keywords: { type: String, required: false },
    targetAudience: {type: String, required: false },
    goals: { type: String, required: false },
    caption: { type: String, required: false },
    date: { type: Date, required: false },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User',
    },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);