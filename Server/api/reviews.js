const express = require('express');
const Review = require('../models/Review'); // Import the Review model
const router = express.Router();

// Create a new review
router.post('/reviews', async (req, res) => {
  try {
    const { car_id, user_id, rating, feedback } = req.body;

    if (!car_id || !user_id || !rating) {
      return res.status(400).json({ message: 'Car ID, User ID, and Rating are required.' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
    }

    const newReview = new Review({ car_id, user_id, rating, feedback });
    await newReview.save();

    res.status(201).json({ message: 'Review submitted successfully', review: newReview });
  } catch (error) {
    console.error('Error creating review:', error.message);
    if (error.code === 11000) {
      return res.status(409).json({ message: 'You have already submitted a review for this car.' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all reviews for a specific car
router.get('/reviews/:car_id', async (req, res) => {
  try {
    const { car_id } = req.params;

    const reviews = await Review.find({ car_id });
    res.status(200).json({ car_id, reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete a review (optional: by user_id and car_id)
router.delete('/reviews/:car_id/:user_id', async (req, res) => {
  try {
    const { car_id, user_id } = req.params;

    const deletedReview = await Review.findOneAndDelete({ car_id, user_id });
    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found.' });
    }

    res.status(200).json({ message: 'Review deleted successfully.' });
  } catch (error) {
    console.error('Error deleting review:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
