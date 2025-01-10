const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            minlength: 6
        },

        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user'
        },
        refreshToken: {
            type: String,
            default: null
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);