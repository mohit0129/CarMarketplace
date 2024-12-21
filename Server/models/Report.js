// models/Report.js
const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  report_id: {
    type: Number,
    unique: true
  },
  report_type: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'custom'],
    required: true
  },
  date_range: {
    start_date: {
      type: Date,
      required: true
    },
    end_date: {
      type: Date,
      required: true
    }
  },
  listings_summary: {
    total_listings: Number,
    active_listings: Number,
    sold_listings: Number,
    rented_listings: Number,
    average_price: mongoose.Types.Decimal128,
    total_value: mongoose.Types.Decimal128
  },
  bookings_summary: {
    total_bookings: Number,
    pending_bookings: Number,
    confirmed_bookings: Number,
    canceled_bookings: Number,
    completed_bookings: Number,
    total_booking_value: mongoose.Types.Decimal128
  },
  payments_summary: {
    total_payments: Number,
    successful_payments: Number,
    failed_payments: Number,
    pending_payments: Number,
    refunded_payments: Number,
    total_revenue: mongoose.Types.Decimal128
  },
  reviews_summary: {
    total_reviews: Number,
    average_rating: Number,
    rating_distribution: {
      five_star: Number,
      four_star: Number,
      three_star: Number,
      two_star: Number,
      one_star: Number
    }
  },
  generated_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create a separate counter collection if it doesn't exist
// const counterSchema = new mongoose.Schema({
//     _id: { type: String, required: true },
//     seq: { type: Number, default: 0 }
// });
// const Counter = mongoose.model('Counter', counterSchema);

// Modified pre-save middleware for auto-incrementing report_id
// ReportSchema.pre('save', async function(next) {
//     try {
//         if (!this.report_id) {
//             const counter = await Counter.findByIdAndUpdate(
//                 { _id: 'reportId' },
//                 { $inc: { seq: 1 } },
//                 { new: true, upsert: true }
//             );
//             this.report_id = counter.seq;
//         }
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

const Report = mongoose.model('Report', ReportSchema);
module.exports = Report;