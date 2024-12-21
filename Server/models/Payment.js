// //models/payments

// const mongoose = require('mongoose');

// const PaymentSchema = new mongoose.Schema({
//     payment_id: {
//         type: String,
//         // required: true,
//         // unique: true,
//         // autoIncrement: true
//     },
//     // user_id: {
//     //     type: String,
//     //     required: true
//     // },
//     // car_id: {
//     //     type: Number,
//     //     required: false
//     // },
//     transaction_id: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     amount: {
//         type: mongoose.Types.Decimal128,
//         required: true
//     },
//     payment_method: {
//         type: String,
//         enum: ['credit_card', 'debit_card', 'paypal', 'upi'],
//         required: true
//     },
//     payment_status: {
//         type: String,
//         enum: ['completed', 'failed', 'approved'], // These are the allowed values
//         required: true,
//     },
//     date_of_payment: {
//         type: Date,
//         default: Date.now
//     },
// });

// module.exports = mongoose.model('Payment', PaymentSchema);


// models/Payment.js
const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  transaction_id: {
    type: String,
    unique: true,
    required: true
  },
  amount: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  },
  payment_method: {
    type: String,
    enum: ['credit_card', 'debit_card', 'upi', 'paypal'],
    required: true
  },
  payment_status: {
    type: String,
    enum: ['pending', 'success', 'failed', 'refunded'],
    default: 'pending'
  },
  date_of_payment: {
    type: Date,
    default: Date.now
  },
  car_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car'
  },
  booking_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  },
  additional_details: {
    type: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

// Prevent multiple model compilations
const Payment = mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);

module.exports = Payment;