// //api/login.js
// const express = require('express');
// const bcrypt = require('bcrypt');
// const Users = require('../models/Users');

// const router = express.Router();

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     console.log('Login attempt for email:', email);
//     const user = await Users.findOne({ email });
    
//     if (user) {
//       const passwordMatch = await bcrypt.compare(password, user.password);
      
//       if (passwordMatch) {
//         user.lastLogin = new Date();
//         await user.save();
//         return res.json({ flag: "1", name: user.name, id: user._id });
//       }
//     }
    
//     return res.json({ flag: "0", message: "Invalid email or password." });
//   } catch (error) {
//     console.error("Login error: ", error);
//     return res.status(500).json({ flag: "0", message: "Database error" });
//   }
// });

// module.exports = router;
