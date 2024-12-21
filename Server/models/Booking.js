//models/booking

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);  // Import mongoose-sequence

const bookingSchema = new mongoose.Schema({
    listing_id: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: false
    },
    car_id: {
        type: Number,
        required: true
    },
    booking_start_date: {
        type: Date,
        required: true
    },
    booking_end_date: {
        type: Date,
        required: true
    },
    total_price: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    paid_price: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    booking_status: {
        type: String,
        enum: ['pending', 'confirmed', 'canceled', 'completed'],
        default: 'pending'
    },
    payment_status: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },
    booking_id: {
        type: Number,
        unique: true // Ensure the auto-generated booking_id is unique
    },
    transaction_id: {
        type: String,
        unique: true // Ensure the auto-generated booking_id is unique
    }
});

// Apply the auto-increment plugin to `booking_id` field
bookingSchema.plugin(AutoIncrement, { inc_field: 'booking_id' });

module.exports = mongoose.model('Booking', bookingSchema);
