const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'police'],
        default: 'user'
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;