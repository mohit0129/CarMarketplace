const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  car_id: {
    type: Number,
    required: true, // References the car being reviewed
  },
  user_id: {
    type: String,
    required: true, // References the user who submitted the review
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true, // Stars between 1 and 5
  },
  feedback: {
    type: String,
    required: false, // Optional textual feedback
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set to the current date
  },
});

// Ensure a user can submit only one review per car
reviewSchema.index({ car_id: 1, user_id: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);
