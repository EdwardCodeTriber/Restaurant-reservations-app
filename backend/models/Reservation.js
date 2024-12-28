// const mongoose = require("mongoose");

// const ReservationSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   restaurantId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Restaurant",
//     required: true,
//   },
//   partySize: {
//     type: Number,
//     required: true,
//     min: 1,
//   },
//   date: {
//     type: String, // Use ISO date format (YYYY-MM-DD)
//     required: true,
//   },
//   time: {
//     type: String, // Use HH:MM format
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("Reservation", ReservationSchema);

// const mongoose = require("mongoose");

// const ReservationSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User", 
//     required: true,
//   },
//   restaurantId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Restaurant", 
//     required: true,
//   },
//   partySize: {
//     type: Number,
//     required: true,
//     min: 1,
//   },
//   date: {
//     type: Date,
//     required: true,
//   },
//   time: {
//     type: String,
//     required: true,
//     match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("Reservation", ReservationSchema);

// const mongoose = require("mongoose");

// const ReservationSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User", 
//     required: true,
//   },
//   restaurantId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Restaurant", 
//     required: true,
//   },
//   partySize: {
//     type: Number,
//     required: true,
//     min: 1,
//   },
//   date: {
//     type: Date,
//     required: true,
//   },
//   time: {
//     type: String,
//     required: true,
//     match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 
//   },
//   customerName: {
//     type: String,
//     required: true,
//   },
//   emailAddress: {
//     type: String,
//     required: true,
//     match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
//   },
//   status: {
//     type: String,
//     required: true,
//     enum: ["Pending", "Confirmed", "Cancelled"], 
//     default: "Pending",
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("Reservation", ReservationSchema);


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
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
    match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
  },
  customerName: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ["Pending", "Confirmed", "Cancelled"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Reservation", ReservationSchema);