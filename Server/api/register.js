//api/register.js
const express = require('express');
const bcrypt = require('bcrypt');
const Users = require('../models/Users');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, mobileno, password } = req.body;

  if (!name || !email || !mobileno || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const users = new Users({
      name,
      email,
      mobile: mobileno,
      password: hashedPassword,
      status:'active'
    });

    await users.save();
    res.status(200).json({ message: "Registration successful." });
  } catch (error) {
    console.error("Error during registration: ", error);
    res.status(500).json({ message: "Registration failed. Email might already be in use." });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Login attempt for email:', email);
    const user = await Users.findOne({ email });
    
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      
      if (passwordMatch) {
        user.lastLogin = new Date();
        await user.save();
        return res.json({ flag: "1", name: user.name, id: user._id });
      }
    }
    
    return res.json({ flag: "0", message: "Invalid email or password." });
  } catch (error) {
    console.error("Login error: ", error);
    return res.status(500).json({ flag: "0", message: "Database error" });
  }
});

module.exports = router;
