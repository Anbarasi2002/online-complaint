const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    vehicleDetails: {
        vin: { type: String, required: true },
        make: { type: String, required: true },
        model: { type: String, required: true },
        color: { type: String, required: true },
    },
    theftDate: { type: Date, required: true },
    location: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vehicleImage: { type: String, required: false },
    status: {
        type: String,
        enum: ['Registered', 'Under Investigation', 'Resolved'],
        default: 'Registered',
    },
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);