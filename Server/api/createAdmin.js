const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin'); // Adjust path as necessary

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/carRental', {
})
  .then(() => {
    console.log('Connected to MongoDB');
    createAdminUser(); // Call function to create admin user
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Function to create an admin user
async function createAdminUser() {
  const name = 'Mohit'; // Admin name
  const email = 'mohit10209@gmai.com'; // Admin email
  const mobileno = '9876543210'; // Admin mobile number
  const password = '012002'; // Admin password

  if (!name || !email || !mobileno || !password) {
    console.log("All fields are required.");
    return;
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin user with isAdmin set to true
    const adminUser = new Admin({
      name,
      email,
      mobile: mobileno,
      password: hashedPassword,
      isAdmin: true, // Set isAdmin to true for admin users
    });

    // Save admin user to the database
    await adminUser.save();
    console.log('Admin registration successful.');
  } catch (error) {
    console.error('Error during registration: ', error);
  } finally {
    // Close the connection after the operation
    mongoose.connection.close();
  }
}
