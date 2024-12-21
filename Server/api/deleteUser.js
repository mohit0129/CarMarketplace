const express = require('express');
const Users = require('../models/Users');  // Assuming Users is your Mongoose model

const router = express.Router();

// Delete user by _id
router.delete('/deleteUser/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await Users.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
