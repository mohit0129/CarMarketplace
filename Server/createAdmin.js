// createAdmin.js
const bcrypt = require('bcrypt');
const Admin = require('./models/Admin');
const mongoose = require('./db');

const createAdmin = async (email, password, name) => {
  try {
    // Input validation
    if (!email || !password || !name) {
      console.error("Error: Email, password, and name are required");
      return;
    }

    // Convert email to lowercase for consistency
    email = email.toLowerCase();

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log(`Admin already exists with email: ${email}`);
      await mongoose.connection.close();
      return;
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create new admin
    const adminUser = new Admin({
      name: name,
      email: email,
      password: passwordHash,
      createdAt: new Date(),
      lastLogin: null
    });

    // Save admin to database
    await adminUser.save();
    console.log(`New admin account created successfully for ${email}`);

  } catch (error) {
    console.error("Error during admin creation:", error.message);
  } finally {
    // Close MongoDB connection
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
};

// Get command line arguments
const args = process.argv.slice(2);

if (args.length !== 3) {
  console.log("Usage: node createAdmin.js <name> <email> <password>");
  console.log("Example: node createAdmin.js 'Admin User' admin@example.com mypassword123");
  process.exit(1);
}

// Execute admin creation with command line arguments
const [name, email, password] = args;
createAdmin(email, password, name);