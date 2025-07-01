const mongoose = require('mongoose');
const { Schema } = mongoose;

const HealthRecordSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // This links the record to a user
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    recordType: {
        type: String,
        default: 'General Note' // e.g., 'Lab Report', 'Prescription', 'Doctor's Note'
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('healthrecord', HealthRecordSchema);