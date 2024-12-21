// controllers/reportController.js
const Car = require('../models/CarListing');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');
const User = require('../models/Users');
const PDFDocument = require('pdfkit');
const moment = require('moment');

exports.generateMonthlyReport = async (req, res) => {
  try {
    const { month, year, reportType } = req.query;

    // Create a new PDF document
    const doc = new PDFDocument();

    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=monthly_report_${month}_${year}.pdf`);

    // Pipe the PDF to the response
    doc.pipe(res);

    // Add report title
    doc.fontSize(20).text(`Monthly Business Report - ${moment(`${year}-${month}`).format('MMMM YYYY')}`, { align: 'center' });
    doc.moveDown();

    // Fetch data based on report type
    let data, title;
    switch (reportType) {
      case 'sales':
        data = await fetchSalesData(month, year);
        title = 'Car Sales Report';
        break;
      case 'rentals':
        data = await fetchRentalData(month, year);
        title = 'Car Rental Report';
        break;
      case 'financials':
        data = await fetchPaymentData(month, year);
        title = 'Payment Transaction Report';
        break;
      case 'customerfeedback':
        data = await fetchCustomerFeedbackData(month, year);
        console.log('Customer Feedback Data:', JSON.stringify(data, null, 2)); // Debugging log
        title = 'Customer Feedback Report';
        break;
      default:
        data = await fetchOverallReport(month, year);
        title = 'Overall Business Report';
    }

    // Add section headers and data
    doc.fontSize(16).text(title, { underline: true });
    doc.moveDown();

    // Render report sections
    renderReportSections(doc, data);

    // Add summary and totals
    addReportSummary(doc, data);

    // Finalize PDF
    doc.end();

  } catch (error) {
    console.error('Report Generation Error:', error);
    res.status(500).json({ message: 'Error generating report', error: error.message });
  }
};

exports.generateReport = async (req, res) => {
  try {
    const { month, year, reportType, reportScope } = req.query;

    // Validate input
    if (!year) {
      return res.status(400).json({ message: 'Year is required' });
    }

    if (reportScope === 'monthly' && !month) {
      return res.status(400).json({ message: 'Month is required for monthly reports' });
    }

    // Create a new PDF document
    const doc = new PDFDocument();

    // Set response headers for PDF download
    const filename = reportScope === 'yearly' 
      ? `yearly_report_${year}.pdf` 
      : `monthly_report_${month}_${year}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

    // Pipe the PDF to the response
    doc.pipe(res);

    // Add report title
    const titleDate = reportScope === 'yearly' 
      ? `Year ${year}` 
      : moment(`${year}-${month}`).format('MMMM YYYY');
    
    doc.fontSize(20).text(`Business Report - ${titleDate}`, { align: 'center' });
    doc.moveDown();

    // Fetch data based on report type and scope
    let data, title;
    switch (reportType) {
      case 'sales':
        data = await fetchSalesData(month, year, reportScope);
        title = 'Car Sales Report';
        break;
      case 'rentals':
        data = await fetchRentalData(month, year, reportScope);
        title = 'Car Rental Report';
        break;
      case 'financials':
        data = await fetchPaymentData(month, year, reportScope);
        title = 'Payment Transaction Report';
        break;
      case 'customerfeedback':
        data = await fetchCustomerFeedbackData(month, year, reportScope);
        title = 'Customer Feedback Report';
        break;
      default:
        data = await fetchOverallReport(month, year, reportScope);
        title = 'Overall Business Report';
    }

    // Add section headers and data
    doc.fontSize(16).text(title, { underline: true });
    doc.moveDown();

    // Render report sections
    renderReportSections(doc, data);

    // Add summary and totals
    addReportSummary(doc, data);

    // Finalize PDF
    doc.end();

  } catch (error) {
    console.error('Report Generation Error:', error);
    res.status(500).json({ message: 'Error generating report', error: error.message });
  }
};

async function fetchSalesData(month, year, scope) {
  const matchCondition = {
    RentSell: 'Sell',
    date_posted: scope === 'yearly' 
      ? { $gte: new Date(`${year}-01-01`), $lt: new Date(`${parseInt(year) + 1}-01-01`) }
      : { $gte: new Date(`${year}-${month}-01`), $lt: new Date(`${year}-${parseInt(month) + 1}-01`) }
  };

  return await Car.aggregate([
    { $match: matchCondition },
    {
      $group: {
        _id: null,
        totalListings: { $sum: 1 },
        totalSalesValue: { $sum: { $toDouble: '$price' } },
        carsByMake: { $push: '$make' }
      }
    }
  ]);
}


async function fetchRentalData(month, year, scope) {
  const matchCondition = {
    booking_start_date: scope === 'yearly' 
      ? { $gte: new Date(`${year}-01-01`), $lt: new Date(`${parseInt(year) + 1}-01-01`) }
      : { $gte: new Date(`${year}-${month}-01`), $lt: new Date(`${year}-${parseInt(month) + 1}-01`) }
  };

  return await Booking.aggregate([
    { $match: matchCondition },
    {
      $group: {
        _id: null,
        totalBookings: { $sum: 1 },
        totalRentalRevenue: { $sum: { $toDouble: '$total_price' } },
        pendingBookings: { $sum: { $cond: [{ $eq: ['$booking_status', 'pending'] }, 1, 0] } }
      }
    }
  ]);
}


async function fetchPaymentData(month, year) {
  return await Payment.aggregate([
    {
      $match: {
        date_of_payment: {
          $gte: new Date(`${year}-${month}-01`),
          $lt: new Date(`${year}-${parseInt(month) + 1}-01`)
        }
      }
    },
    {
      $group: {
        _id: null,
        totalPayments: { $sum: 1 },
        totalPaymentAmount: { $sum: { $toDouble: '$amount' } },
        successfulPayments: { $sum: { $cond: [{ $eq: ['$payment_status', 'success'] }, 1, 0] } },
        failedPayments: { $sum: { $cond: [{ $eq: ['$payment_status', 'failed'] }, 1, 0] } }
      }
    }
  ]);
}

async function fetchOverallReport(month, year, scope) {
  const [sales, rentals, financials] = await Promise.all([
    fetchSalesData(month, year, scope),
    fetchRentalData(month, year, scope),
    fetchPaymentData(month, year, scope)
  ]);

  return { sales, rentals, financials };
}

async function fetchCustomerFeedbackData(month, year, scope) {
  const matchCondition = {
    booking_start_date: scope === 'yearly' 
      ? { $gte: new Date(`${year}-01-01`), $lt: new Date(`${parseInt(year) + 1}-01-01`) }
      : { $gte: new Date(`${year}-${month}-01`), $lt: new Date(`${year}-${parseInt(month) + 1}-01`) },
    feedback: { $exists: true, $ne: null }
  };

  const result = await Booking.aggregate([
    { $match: matchCondition },
    {
      $group: {
        _id: null,
        totalReviews: { $sum: 1 },
        averageRating: { $avg: { $toDouble: '$rating' } },
        feedbackDetails: { 
          $push: { user: '$user_id', comment: '$feedback', rating: '$rating' } 
        }
      }
    }
  ]);

  return result.length > 0 ? result[0] : { totalReviews: 0, averageRating: 0, feedbackDetails: [] };
}


function renderReportSections(doc, data) {
  // Customize based on your specific data structure
  doc.fontSize(12)
    .text(`Total Listings/Bookings: ${data.totalListings || data.totalBookings || 'N/A'}`)
    .text(`Total Revenue: $${data.totalSalesValue || data.totalRentalRevenue || 'N/A'}`);
}

function addReportSummary(doc, data) {
  doc.moveDown()
    .fontSize(14)
    .text('Summary', { underline: true })
    .fontSize(12)
    .text('Generated on: ' + moment().format('YYYY-MM-DD HH:mm:ss'));
}

function renderReportSections(doc, data) {
  doc.fontSize(12);

  if (data.totalReviews && data.totalReviews > 0) {
    doc.text(`Total Reviews: ${data.totalReviews}`)
       .text(`Average Rating: ${data.averageRating.toFixed(2)}`)
       .moveDown();

    doc.text('Customer Feedback Details:', { underline: true });
    data.feedbackDetails.forEach((feedback, index) => {
      doc.text(`${index + 1}. User: ${feedback.user}, Rating: ${feedback.rating}, Comment: ${feedback.comment}`);
    });
  } else {
    doc.text('No customer feedback data available for the selected month.');
  }
}

function addReportSummary(doc, data) {
  doc.moveDown()
    .fontSize(14)
    .text('Summary', { underline: true })
    .fontSize(12);

  if (data.totalReviews) {
    doc.text(`Total Reviews: ${data.totalReviews}`)
      .text(`Average Rating: ${data.averageRating.toFixed(2)}`);
  }
  doc.text('Generated on: ' + moment().format('YYYY-MM-DD HH:mm:ss'));
}
