const express = require('express');
const router = express.Router();
const { generateMonthlyReport } = require('./reportController');

// Ensure the route is correctly defined
router.get('/monthly-report', generateMonthlyReport);

module.exports = router;