// //api/bookings

// const express = require('express');
// const router = express.Router();
// const db = require('../db');
// const { ObjectId } = require('mongodb');
// const Booking = require('../models/Booking');

// router.post('/', async (req, res) => {
//     const { listing_id, user_id, car_id, booking_start_date, booking_end_date, total_price, paid_price, booking_status, payment_status, transaction_id } = req.body;

//     // Validate the required fields
//     if (!listing_id || !user_id || !car_id || !booking_start_date || !booking_end_date || !total_price || !paid_price || !booking_status || !payment_status || !transaction_id) {
//         return res.status(400).json({
//             message: "Missing required fields: listing_id, user_id, car_id,booking_start_date, booking_end_date, total_price, paid_price, transaction_id"
//         });
//     }

//     try {
//         // Create a new booking without explicitly setting booking_id (it will auto-increment)
//         const newBooking = new Booking({
//             listing_id,
//             user_id,
//             car_id,
//             booking_start_date,
//             booking_end_date,
//             total_price,
//             paid_price,
//             transaction_id,
//             booking_status: 'pending',  // Default value
//             payment_status: 'pending'   // Default value
//         });

//         // Save the new booking
//         const result = await newBooking.save();
//         res.status(201).json(result);  // Send the created booking as the response
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });


// router.get('/', async (req, res) => {
//     try {
//         // Fetch all bookings using Mongoose's `find()` method
//         const bookings = await Booking.find();
//         res.json(bookings);  // Return the fetched bookings as JSON
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Get a booking by ID
// router.get('/:id', async (req, res) => {
//     try {
//         // Find a booking by ID using Mongoose's `findById()` method
//         const booking = await Booking.findOne({ booking_id: req.params.id });
        
//         // If booking not found, return 404
//         if (!booking) return res.status(404).json({ message: "Booking not found" });
        
//         // Return the found booking as JSON
//         res.json(booking);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });
// // Update a booking by ID

// // Update a booking by booking_id (not by _id)
// router.put('/:id', async (req, res) => {
//     try {
//         // Find a booking by booking_id (numeric) instead of Mongo's _id
//         const updatedBooking = await Booking.findOneAndUpdate(
//             { booking_id: req.params.id },  // Use booking_id for query
//             { $set: req.body },  // Update fields
//             { new: true }  // Return the updated document
//         );

//         if (!updatedBooking) {
//             return res.status(404).json({ message: "Booking not found" });
//         }

//         res.json(updatedBooking);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Delete a booking by booking_id (not by _id)
// router.delete('/:id', async (req, res) => {
//     try {
//         // Find and delete the booking by booking_id (numeric)
//         const deletedBooking = await Booking.findOneAndDelete({ booking_id: req.params.id });

//         if (!deletedBooking) {
//             return res.status(404).json({ message: "Booking not found" });
//         }

//         res.json({ message: "Booking deleted successfully" });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const db = require('../db');
const { ObjectId } = require('mongodb');

// Create a new booking
router.post('/', async (req, res) => {
    const { listing_id, user_id, car_id, booking_start_date, booking_end_date, total_price, paid_price, booking_status, payment_status, transaction_id } = req.body;

    // Validate the required fields
    if (!listing_id || !user_id || !car_id || !booking_start_date || !booking_end_date || !total_price || !paid_price || !booking_status || !payment_status || !transaction_id) {
        return res.status(400).json({
            message: "Missing required fields: listing_id, user_id, car_id, booking_start_date, booking_end_date, total_price, paid_price, transaction_id"
        });
    }

    try {
        const newBooking = new Booking({
            listing_id,
            user_id,
            car_id,
            booking_start_date,
            booking_end_date,
            total_price,
            paid_price,
            transaction_id,
            booking_status: 'pending',
            payment_status: 'pending'
        });

        const result = await newBooking.save();
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        // Fetch all bookings using Mongoose's `find()` method
        const bookings = await Booking.find();
        res.json(bookings);  // Return the fetched bookings as JSON
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Fetch bookings for a specific user
router.get('/uid/', async (req, res) => {
    const { user_id } = req.query; // Get `user_id` from query parameters

    if (!user_id) {
        return res.status(400).json({ message: "Missing required query parameter: user_id" });
    }

    try {
        // Fetch bookings for the specific user
        const bookings = await Booking.find({ user_id });

        if (!bookings.length) {
            return res.status(404).json({ message: "No bookings found for the specified user" });
        }

        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Fetch a booking by booking_id
router.get('/:id', async (req, res) => {
    try {
        const booking = await Booking.findOne({ booking_id: req.params.id });

        if (!booking) return res.status(404).json({ message: "Booking not found" });

        res.json(booking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a booking by booking_id
router.put('/:id', async (req, res) => {
    try {
        const updatedBooking = await Booking.findOneAndUpdate(
            { booking_id: req.params.id },
            { $set: req.body },
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.json(updatedBooking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a booking by booking_id
router.delete('/:id', async (req, res) => {
    try {
        const deletedBooking = await Booking.findOneAndDelete({ booking_id: req.params.id });

        if (!deletedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.json({ message: "Booking deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
