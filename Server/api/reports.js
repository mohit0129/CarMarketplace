// // routes/reports.js
// const express = require('express');
// const router = express.Router();
// const Report = require('../models/Report');
// const CarListing = require('../models/CarListing');
// const Booking = require('../models/Booking');
// const Payment = require('../models/Payment');
// const Review = require('../models/Review');

// // Generate a new report
// router.post('/generate', async (req, res) => {
//     try {
//         const { report_type, start_date, end_date } = req.body;
        
//         // Date range validation
//         const startDate = new Date(start_date);
//         const endDate = new Date(end_date);
        
//         if (endDate < startDate) {
//           return res.status(400).json({ message: 'End date must be after start date' });
//         }

//     // Gather data from all collections
//     const [
//       listingsData,
//       bookingsData,
//       paymentsData,
//       reviewsData
//     ] = await Promise.all([
//       // Listings aggregation
//       CarListing.aggregate([
//         {
//           $match: {
//             date_posted: { $gte: startDate, $lte: endDate }
//           }
//         },
//         {
//           $group: {
//             _id: null,
//             total_listings: { $sum: 1 },
//             active_listings: {
//               $sum: { $cond: [{ $eq: ['$listing_status', 'active'] }, 1, 0] }
//             },
//             sold_listings: {
//               $sum: { $cond: [{ $eq: ['$listing_status', 'sold'] }, 1, 0] }
//             },
//             rented_listings: {
//               $sum: { $cond: [{ $eq: ['$listing_status', 'rented'] }, 1, 0] }
//             },
//             average_price: { $avg: { $toDouble: '$price' } },
//             total_value: { $sum: { $toDouble: '$price' } }
//           }
//         }
//       ]),

//       // Bookings aggregation
//       Booking.aggregate([
//         {
//           $match: {
//             booking_start_date: { $gte: startDate, $lte: endDate }
//           }
//         },
//         {
//           $group: {
//             _id: null,
//             total_bookings: { $sum: 1 },
//             pending_bookings: {
//               $sum: { $cond: [{ $eq: ['$booking_status', 'pending'] }, 1, 0] }
//             },
//             confirmed_bookings: {
//               $sum: { $cond: [{ $eq: ['$booking_status', 'confirmed'] }, 1, 0] }
//             },
//             canceled_bookings: {
//               $sum: { $cond: [{ $eq: ['$booking_status', 'canceled'] }, 1, 0] }
//             },
//             completed_bookings: {
//               $sum: { $cond: [{ $eq: ['$booking_status', 'completed'] }, 1, 0] }
//             },
//             total_booking_value: { $sum: { $toDouble: '$total_price' } }
//           }
//         }
//       ]),

//       // Payments aggregation
//       Payment.aggregate([
//         {
//           $match: {
//             date_of_payment: { $gte: startDate, $lte: endDate }
//           }
//         },
//         {
//           $group: {
//             _id: null,
//             total_payments: { $sum: 1 },
//             successful_payments: {
//               $sum: { $cond: [{ $eq: ['$payment_status', 'success'] }, 1, 0] }
//             },
//             failed_payments: {
//               $sum: { $cond: [{ $eq: ['$payment_status', 'failed'] }, 1, 0] }
//             },
//             pending_payments: {
//               $sum: { $cond: [{ $eq: ['$payment_status', 'pending'] }, 1, 0] }
//             },
//             refunded_payments: {
//               $sum: { $cond: [{ $eq: ['$payment_status', 'refunded'] }, 1, 0] }
//             },
//             total_revenue: { $sum: { $toDouble: '$amount' } }
//           }
//         }
//       ]),

//       // Reviews aggregation
//       Review.aggregate([
//         {
//           $match: {
//             createdAt: { $gte: startDate, $lte: endDate }
//           }
//         },
//         {
//           $group: {
//             _id: null,
//             total_reviews: { $sum: 1 },
//             average_rating: { $avg: '$rating' },
//             rating_distribution: {
//               $push: '$rating'
//             }
//           }
//         }
//       ])
//     ]);

//     // Process ratings distribution
//     const ratingDistribution = reviewsData[0]?.rating_distribution || [];
//     const ratingCounts = {
//       five_star: ratingDistribution.filter(r => r === 5).length,
//       four_star: ratingDistribution.filter(r => r === 4).length,
//       three_star: ratingDistribution.filter(r => r === 3).length,
//       two_star: ratingDistribution.filter(r => r === 2).length,
//       one_star: ratingDistribution.filter(r => r === 1).length
//     };

//     // Create new report
//     const newReport = new Report({
//         report_type,
//         date_range: { start_date: startDate, end_date: endDate },
//         listings_summary: listingsData[0] || {
//           total_listings: 0,
//           active_listings: 0,
//           sold_listings: 0,
//           rented_listings: 0,
//           average_price: 0,
//           total_value: 0
//         },
//         bookings_summary: bookingsData[0] || {
//           total_bookings: 0,
//           pending_bookings: 0,
//           confirmed_bookings: 0,
//           canceled_bookings: 0,
//           completed_bookings: 0,
//           total_booking_value: 0
//         },
//         payments_summary: paymentsData[0] || {
//           total_payments: 0,
//           successful_payments: 0,
//           failed_payments: 0,
//           pending_payments: 0,
//           refunded_payments: 0,
//           total_revenue: 0
//         },
//         reviews_summary: {
//           total_reviews: reviewsData[0]?.total_reviews || 0,
//           average_rating: reviewsData[0]?.average_rating || 0,
//           rating_distribution: ratingCounts
//         }
//       });

//       const savedReport = await newReport.save();
//       res.status(201).json(savedReport);
//     } catch (error) {
//       console.error('Error generating report:', error);
//       res.status(500).json({ message: error.message });
//     }
// });

// // Get all reports
// router.get('/', async (req, res) => {
//   try {
//     const reports = await Report.find().sort({ generated_at: -1 });
//     res.status(200).json(reports);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Get report by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const report = await Report.findOne({ report_id: req.params.id });
//     if (!report) {
//       return res.status(404).json({ message: 'Report not found' });
//     }
//     res.status(200).json(report);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Delete report
// router.delete('/:id', async (req, res) => {
//   try {
//     const report = await Report.findOneAndDelete({ report_id: req.params.id });
//     if (!report) {
//       return res.status(404).json({ message: 'Report not found' });
//     }
//     res.status(200).json({ message: 'Report deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;

const express = require('express');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');
const router = express.Router();

// Helper function to get the month name
const getMonthName = (month) => new Date(0, month - 1).toLocaleString('default', { month: 'long' });

// API to generate the report
// router.get('/monthly-report', async (req, res) => {
//     try {
//         const { month, year } = req.query;

//         if (!month || !year) {
//             return res.status(400).json({ error: 'Month and year are required' });
//         }

//         // Ensure month and year are integers
//         const monthInt = parseInt(month, 10);
//         const yearInt = parseInt(year, 10);

//         // Validate month and year
//         if (isNaN(monthInt) || isNaN(yearInt) || monthInt < 1 || monthInt > 12) {
//             return res.status(400).json({ error: 'Invalid month or year' });
//         }

//         // Define the date range for the specified month
//         const startDate = new Date(yearInt, monthInt - 1, 1);
//         const endDate = new Date(yearInt, monthInt, 0);

//         // Fetch bookings within the specified date range
//         const bookings = await Booking.find({
//             booking_start_date: { $gte: startDate, $lte: endDate }
//         });

//         // Calculate totals
//         const totalListings = bookings.length;
//         const activeListings = bookings.filter((b) => b.booking_status === 'pending').length;
//         const soldListings = bookings.filter((b) => b.booking_status === 'completed').length;
//         const rentedListings = bookings.filter((b) => b.booking_status === 'confirmed').length;
//         const requestedListings = bookings.filter((b) => b.booking_status === 'canceled').length;

//         // Calculate total revenue from payments within the specified date range
//         const payments = await Payment.find({
//             date_of_payment: { $gte: startDate, $lte: endDate },
//             payment_status: 'success'
//         });

//         const totalRevenue = payments.reduce((sum, payment) => sum + parseFloat(payment.amount), 0);

//         // Generate the report data
//         const reportData = {
//             month: getMonthName(monthInt),
//             year: yearInt,
//             totalListings,
//             activeListings,
//             soldListings,
//             rentedListings,
//             requestedListings,
//             totalRevenue: `₹${totalRevenue.toLocaleString('en-IN')}`,
//             generatedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
//         };

//         // Respond with the report data
//         res.status(200).json(reportData);
//     } catch (error) {
//         console.error('Error generating report:', error);
//         res.status(500).json({ error: 'Failed to generate report' });
//     }
// });

router.get('/monthly-report', async (req, res) => {
    try {
        const { month, year } = req.query;

        if (!month || !year) {
            return res.status(400).json({ error: 'Month and year are required' });
        }

        const monthInt = parseInt(month, 10);
        const yearInt = parseInt(year, 10);

        if (isNaN(monthInt) || isNaN(yearInt) || monthInt < 1 || monthInt > 12) {
            return res.status(400).json({ error: 'Invalid month or year' });
        }

        const startDate = new Date(yearInt, monthInt - 1, 1);
        const endDate = new Date(yearInt, monthInt, 0, 23, 59, 59);

        console.log('Start Date:', startDate, 'End Date:', endDate);

        const bookings = await Booking.find({
            booking_start_date: { $gte: startDate, $lte: endDate }
        });
        console.log('Bookings:', bookings);

        const payments = await Payment.find({
            date_of_payment: { $gte: startDate, $lte: endDate },
            payment_status: 'success'
        });
        console.log('Payments:', payments);

        const totalListings = bookings.length;
        const activeListings = bookings.filter((b) => b.booking_status === 'pending').length;
        const soldListings = bookings.filter((b) => b.booking_status === 'completed').length;
        const rentedListings = bookings.filter((b) => b.booking_status === 'confirmed').length;
        const requestedListings = bookings.filter((b) => b.booking_status === 'canceled').length;

        const totalRevenue = payments.reduce((sum, payment) => sum + parseFloat(payment.amount), 0);

        const reportData = {
            month: getMonthName(monthInt),
            year: yearInt,
            totalListings,
            activeListings,
            soldListings,
            rentedListings,
            requestedListings,
            totalRevenue: `₹${totalRevenue.toLocaleString('en-IN')}`,
            generatedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        };

        res.status(200).json(reportData);
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).json({ error: 'Failed to generate report' });
    }
});


module.exports = router;
