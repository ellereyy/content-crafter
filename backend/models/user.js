const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
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
        name: { type: String, required: false },
        businessName: { type: String, required: false },
        handle: { type: String, required: false },
        goals: { type: String, required: false },
        industry: { type: String, required: false},
        brandingKeywords: { type: String, required: false },
        competitiveAdvantage: { type: String, required: false },
        valueProposition: { type: String, required: false },
        missionStatement: { type: String, required: false },
    },
    { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)
