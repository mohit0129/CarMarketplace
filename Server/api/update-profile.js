//api/update-profile.js
const express = require('express');
const Users = require('../models/Users');

const router = express.Router();

// update-profile.js
router.get('/get-profile', async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ flag: "0", message: "User ID is required." });
  }

  try {
    const user = await Users.findById(id, 'name email mobile createdAt lastLogin');
    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json({ flag: "0", message: "User not found." });
    }
  } catch (error) {
    console.error("Error fetching profile data: ", error);
    return res.status(500).json({ flag: "0", message: "Database error" });
  }
});


router.post('/update-profile', async (req, res) => {
  const { id, name, email, mobile } = req.body;

  if (!id || !name || !email || !mobile) {
    return res.status(400).json({ flag: "0", message: "All fields are required." });
  }

  try {
    const user = await Users.findById(id);
    if (user) {
      user.name = name;
      user.email = email;
      user.mobile = mobile;
      await user.save();

      return res.json({ flag: "1", message: "Profile updated successfully." });
    } else {
      return res.status(404).json({ flag: "0", message: "User not found." });
    }
  } catch (error) {
    console.error("Error updating profile: ", error);
    return res.status(500).json({ flag: "0", message: "Database error" });
  }
});

router.get('/get-users', async (req, res) => {
  try {
    const users = await Users.find({}, 'name email mobile role status lastLogin');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users.' });
  }
});

router.post('/suspend-user', async (req, res) => {
  const { id } = req.body;
  try {
    const user = await Users.findById(id);
    if (user) {
      user.status = 'Suspended';
      await user.save();
      res.json({ message: 'User suspended successfully.' });
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    console.error('Error suspending user:', error);
    res.status(500).json({ message: 'Failed to suspend user.' });
  }
});


module.exports = router;
