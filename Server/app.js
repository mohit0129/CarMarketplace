// app.js
require('./db'); // MongoDB connection

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const path = require('path');
const listingsRouter = require('./api/listings');
const bookingRoutes = require('./api/bookings');
const paymentRoutes = require('./api/payments');
const adminLoginRoutes = require('./api/adminLogin');
const deleteUserRoute = require('./api/deleteUser');
const photoUploadRoutes = require('./api/listings');
const reviewRoutes = require('./api/reviews'); // Import the review routes
const reportGenerate = require('./api/report-generate');  // Import the report generation file

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use('/api/reports', reportGenerate);  // Mount the report generation functionality
// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', reviewRoutes); // Mount review routes under `/api`
// Routes
app.use(require('./api/password-reset'));
// app.use(require('./api/login'));
app.use(require('./api/register'));
app.use(require('./api/change-password'));
app.use(require('./api/update-profile'));
// app.use(require('./api/carListing'));
app.use('/api/listings', listingsRouter);
app.use('/api/booking', bookingRoutes);
app.use('/payments', paymentRoutes);
app.use('/api', deleteUserRoute);
app.use('/api/admin', adminLoginRoutes);      // Admin login
app.use('/api/upload', photoUploadRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// // app.js
// require('./db'); // MongoDB connection

// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const PDFDocument = require('pdfkit'); // Import PDFKit
// const path = require('path');
// const app = express();

// const listingsRouter = require('./api/listings');
// const bookingRoutes = require('./api/bookings');
// const paymentRoutes = require('./api/payments');
// const adminLoginRoutes = require('./api/adminLogin');
// const deleteUserRoute = require('./api/deleteUser');
// const photoUploadRoutes = require('./api/listings');
// const reviewRoutes = require('./api/reviews'); // Import the review routes

// // Middleware
// app.use(cors());
// app.use(express.json()); // To parse JSON request bodies
// app.use(express.urlencoded({ extended: true }));
// // Serve static files from uploads directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/api', reviewRoutes); // Mount review routes under `/api`
// // Routes
// app.use(require('./api/password-reset'));
// app.use(require('./api/register'));
// app.use(require('./api/change-password'));
// app.use(require('./api/update-profile'));
// app.use('/api/listings', listingsRouter);
// app.use('/api/booking', bookingRoutes);
// app.use('/payments', paymentRoutes);
// app.use('/api', deleteUserRoute);
// app.use('/api/admin', adminLoginRoutes);      // Admin login
// app.use('/api/upload', photoUploadRoutes);

// // Define the /api/reports route for generating PDFs
// app.get('/api/reports', (req, res) => {
//   const { reportType, reportScope, year, month } = req.query;

//   // Current date for the summary
//   const now = new Date();
//   const generatedDate = now.toLocaleString();

//   // Create a PDF document
//   const doc = new PDFDocument();
//   const filename = `${reportScope}_${reportType}_${year}${month ? `_${month}` : ''}.pdf`;

//   // Set response headers
//   res.setHeader('Content-Type', 'application/pdf');
//   res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

//   doc.pipe(res);

//   // Add title to the PDF
//   doc.fontSize(20).text(`${reportScope.charAt(0).toUpperCase() + reportScope.slice(1)} ${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report`, { align: 'center' });
//   doc.moveDown();

//   // Add summary
//   doc.fontSize(12).text(`Summary:`, { underline: true });
//   doc.text(`Generated on: ${generatedDate}`);
//   doc.moveDown();

//   // Dynamic content based on report type and scope
//   if (reportScope === 'monthly' && reportType === 'overall') {
//     doc.text(`Month/Year   Total Listings   Active Listings   Sold Listings   Rented Listings   Requested Listings   Total Revenue`);
//     doc.text(`January 2024       150              30                  50               20                  50                ₹500,000`);
//     doc.text(`February 2024      120              40                  40               30                  10                ₹400,000`);
//     doc.text(`March 2024         180              60                  60               50                  10                ₹700,000`);
//     doc.text(`Total              450              130                 150              100                 70                ₹1,600,000`);
//   } else if (reportScope === 'monthly' && reportType === 'sales') {
//     doc.text(`Month/Year   Car Model   Year   Price   Sale Date   Customer Name   Location   Payment Status`);
//     doc.text(`January 2024 Honda Civic 2020 ₹20,000 2024-01-15 John Doe New York Paid`);
//     doc.text(`January 2024 Ford Mustang 2019 ₹30,000 2024-01-20 Jane Smith Los Angeles Pending`);
//     doc.text(`February 2024 BMW X5 2021 ₹50,000 2024-02-05 Bob Johnson Miami Paid`);
//     doc.text(`Total ₹100,000`);
//   } else if (reportScope === 'yearly' && reportType === 'overall') {
//     doc.text(`Year   Total Listings   Cars Sold   Cars Rented   Total Transactions`);
//     doc.text(`2023   320              150          120           270`);
//     doc.text(`2022   290              140          100           240`);
//     doc.text(`2021   250              130          90            220`);
//   }

//   // Close the PDF document
//   doc.end();
// });

// // Start the server
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const reportGenerate = require('./api/report-generate');  // Import the report generation file

// const app = express();
// const PORT = 3001;

// app.use(bodyParser.json());
// app.use(cors());

// // Use the report generation route
// app.use('/api/reports', reportGenerate);  // Mount the report generation functionality

// // Other routes (existing in app.js)
// app.use(require('./api/password-reset'));
// app.use(require('./api/register'));
// app.use(require('./api/change-password'));
// app.use(require('./api/update-profile'));
// app.use('/api/listings', require('./api/listings'));
// app.use('/api/booking', require('./api/bookings'));
// app.use('/payments', require('./api/payments'));
// app.use('/api', require('./api/deleteUser'));
// app.use('/api/admin', require('./api/adminLogin'));
// app.use('/api/upload', require('./api/listings'));

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
