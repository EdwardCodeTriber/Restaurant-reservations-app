const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");


// @route   POST /reservations
// @desc    Create a reservation
// @access  Private
router.post("/", verifyUser, async (req, res) => {
  const { restaurantId, partySize, date, time } = req.body;

  // Validate input
  if (!restaurantId || !partySize || !date || !time) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const reservation = new Reservation({
      userId: req.user._id, // From verifyUser middleware
      restaurantId,
      partySize,
      date,
      time,
    });

    await reservation.save();
    res.status(201).json({ message: "Reservation created successfully", reservation });
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
