const express = require('express');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');

const router = express.Router();

router.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Admin login attempt for email:', email);
    const admin = await Admin.findOne({ email });
    console.log('Admin found:', admin ? 'Yes' : 'No');
    
    if (admin) {
      const passwordMatch = await bcrypt.compare(password, admin.password);
      console.log('Password match:', passwordMatch ? 'Yes' : 'No');
      
      if (passwordMatch) {
        admin.lastLogin = new Date();
        await admin.save();
        console.log('Sending successful admin login response:', { flag: "1", name: admin.name, id: admin._id });
        return res.json({ flag: "1", name: admin.name, id: admin._id });
      }
    }
    
    console.log('Admin login failed: Invalid email or password');
    return res.json({ flag: "0", message: "Invalid email or password." });
  } catch (error) {
    console.error("Admin login error: ", error);
    return res.status(500).json({ flag: "0", message: "Database error" });
  }
});

module.exports = router;

// Example usage:
const app = express();
app.use(express.json());
app.use('/api', router);

// This is just for demonstration, don't actually start the server here
// app.listen(3001, () => console.log('Server running on port 3001'));