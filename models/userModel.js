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
            minlength: [6, "Parol uzunligi kamida 6 ta belgidan iborat bo'lishi kerak"],
            validate: {
              validator: function (value) {
                return value.trim().length >= 6; // Bo'sh string yoki faqat bo'sh joylarni oldini olish
              },
              message: "Parol uzunligi kamida 6 ta belgidan iborat bo'lishi kerak",
            },        },

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