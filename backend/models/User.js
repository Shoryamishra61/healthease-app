const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Each email must be unique in the database
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['customer', 'hospital'], // Role must be one of these two values
        default: 'customer'
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const User = mongoose.model('user', UserSchema);
module.exports = User;