//api/password-reset.js
const express = require('express');
const Users = require('../models/Users');

const router = express.Router();

router.post('/password-reset', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Users.findOne({ email });
    if (user) {
      // Email sending logic here
      return res.json({ flag: "1", message: "A reset link has been sent to your email." });
    } else {
      return res.json({ flag: "0", message: "No account associated with this email." });
    }
  } catch (error) {
    console.error("Error in password reset: ", error);
    return res.status(500).json({ flag: "0", message: "Database error" });
  }
});

module.exports = router;
