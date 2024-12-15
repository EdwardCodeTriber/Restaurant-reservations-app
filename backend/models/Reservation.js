const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  partySize: {
    type: Number,
    required: true,
    min: 1,
  },
  date: {
    type: String, // Use ISO date format (YYYY-MM-DD)
    required: true,
  },
  time: {
    type: String, // Use HH:MM format
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Reservation", ReservationSchema);
