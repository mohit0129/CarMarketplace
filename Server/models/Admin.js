// models/Admin.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserDataSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, // Automatically set the creation date
  lastLogin: { type: Date } // Will be updated on each login
});

const Admin = mongoose.model('Admin', UserDataSchema);

module.exports = Admin;
