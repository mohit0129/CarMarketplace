//api/payments
const express = require('express');
const Payment = require('../models/Payment');
// const Payment = require('../models/payment');
const ObjectId = require('mongodb').ObjectId;
const router = express.Router();

// 1. Create Payment
router.post('/', async (req, res) => {
    try {
        const { user_id, transaction_id, amount, payment_method, payment_status } = req.body;

        // Check if user_id is provided
        if (!user_id) {
            return res.status(400).json({ error: 'user_id is required' });
        }

        // Validate user_id format
        if (!ObjectId.isValid(user_id)) {
            return res.status(400).json({ error: 'Invalid user_id format' });
        }

        const newPayment = new Payment({
            user_id: new ObjectId(user_id),
            transaction_id,
            amount,
            payment_method,
            payment_status,
        });

        await newPayment.save();
        res.status(201).json({ message: 'Payment created successfully', payment: newPayment });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});



// 2. Get All Payments
router.get('/', async (req, res) => {
    try {
        // Fetch all payments from the Payment collection
        const payments = await Payment.find();
        // Return the fetched payments as a JSON response
        res.status(200).json(payments);
    } catch (err) {
        // Catch any errors and return a 500 status with the error message
        res.status(500).json({ error: err.message });
    }
});



// 3. Get Payment by ID
router.get('/:id', async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.status(200).json(payment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Update Payment

router.put('/:id', async (req, res) => {
    try {
        const { user_id, transaction_id, amount, payment_method, payment_status, date_of_payment } = req.body;

        // Validate user_id
        if (user_id && !ObjectId.isValid(user_id)) {
            return res.status(400).json({ error: 'Invalid user_id format' });
        }

        // Validate payment_status
        const validStatuses = ['pending', 'success', 'failed', 'refunded'];
        if (payment_status && !validStatuses.includes(payment_status)) {
            return res.status(400).json({ error: `Invalid payment_status. Allowed values are: ${validStatuses.join(', ')}` });
        }

        const payment = await Payment.findByIdAndUpdate(
            req.params.id,
            {
                user_id: user_id ? new ObjectId(user_id) : undefined, // Convert only if provided
                transaction_id,
                amount,
                payment_method,
                payment_status,
                date_of_payment,
            },
            { new: true, runValidators: true }
        );
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.status(200).json({ message: 'Payment updated successfully', payment });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 5. Delete Payment
router.delete('/:id', async (req, res) => {
    try {
        const payment = await Payment.findByIdAndDelete(req.params.id);
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
