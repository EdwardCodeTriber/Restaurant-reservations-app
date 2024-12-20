const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcrypt');
const cors = require('cors');
const nodemailer = require('nodemailer'); // Add Nodemailer
const Restaurant = require('./models/restaurant');
const Reservation = require("./models/Reservation");
const User = require('./users');
const Favorite = require('./models/Favorites');
const Stripe = require("stripe");
require('dotenv').config();
const app = express();
const PORT = 3000;
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['exp://192.168.18.15:8081', 'http://192.168.18.15:3000'],
    credentials: true,
  })
);

// Session configuration
app.use(
  session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service (e.g., Gmail, Outlook)
  auth: {
    user: process.env.EMAIL_ADD, 
    pass: process.env.EMAIL_PASS, 
  },
});

// Enable notifications endpoint
app.post('/enable-notifications', async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.notificationsEnabled = true;
    await user.save();

    res.status(200).json({ message: 'Notifications enabled' });
  } catch (error) {
    console.error('Error enabling notifications:', error);
    res.status(500).json({ message: 'Error enabling notifications', error: error.message });
  }
});

// Disable notifications endpoint
app.post('/disable-notifications', async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.notificationsEnabled = false;
    await user.save();

    res.status(200).json({ message: 'Notifications disabled' });
  } catch (error) {
    console.error('Error disabling notifications:', error);
    res.status(500).json({ message: 'Error disabling notifications', error: error.message });
  }
});





// Routes

// Update the signup route to match the user schema
app.post('/signup', async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with all required fields
    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: 'USER' // Default role
    });

    // Save the user
    await user.save();

    // Create session
    req.session.userId = user._id;

    // Respond with user info (excluding password)
    res.status(201).send({ 
      message: 'User created', 
      user: { 
        email: user.email, 
        firstName: user.firstName, 
        lastName: user.lastName 
      } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error creating user', error: error.message });
  }
});
  

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ message: 'User not found' });
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).send({ message: 'Invalid credentials' });
    
    // Create session
    req.session.userId = user._id;
    
    // Respond with user info (excluding password)
    res.status(200).send({ 
      message: 'Logged in', 
      user: { 
        email: user.email, 
        firstName: user.firstName, 
        lastName: user.lastName,
        role: user.role 
      } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error logging in', error: error.message });
  }
});


app.post('/signout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send({ message: 'Error signing out' });
    res.clearCookie('connect.sid');
    res.status(200).send({ message: 'Logged out' });
  });
});

//get currently logged in user
app.get('/me', async (req, res) => {
  if (!req.session.userId) return res.status(401).send({ message: 'Not authenticated' });
  
  try {
    const user = await User.findById(req.session.userId);
    if (!user) return res.status(404).send({ message: 'User not found' });
    
    res.status(200).send({ 
      user: { 
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error fetching user', error: error.message });
  }
});

//restaurant routes
app.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    console.error('Error fetching restaurants:', err);
    res.status(500).json({ error: 'Failed to fetch restaurants', details: err.message });
  }
});


app.post('/restaurants/review', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).send({ message: 'Not authenticated' });
  }

  try {
    const { restaurantId, review } = req.body;
    
    // Find the user to get their name
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Find the restaurant
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).send({ message: 'Restaurant not found' });
    }

    // Create the review with user's full name
    const newReview = {
      user: `${user.firstName} ${user.lastName}`,
      rating: review.rating,
      comment: review.comment,
      date: new Date()
    };

    // Add the review to the restaurant's reviews array
    restaurant.reviews.push(newReview);

    // Recalculate the restaurant's overall rating
    const totalRating = restaurant.reviews.reduce((sum, rev) => sum + rev.rating, 0);
    restaurant.rating = Number((totalRating / restaurant.reviews.length).toFixed(1));

    // Save the updated restaurant
    await restaurant.save();

    res.status(201).send({ 
      message: 'Review added successfully', 
      restaurant 
    });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).send({ message: 'Error adding review', error: error.message });
  }
});

app.post('/reservations', async (req, res) => {
  const { userId, restaurantId, partySize, date, time } = req.body;

  // Validate required fields
  if (!userId || !restaurantId || !partySize || !date || !time) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Find the restaurant
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    // Convert the date to a JavaScript Date object
    const reservationDate = new Date(date);
    if (isNaN(reservationDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    // Get the day of the week (e.g., "Monday", "Tuesday")
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = days[reservationDate.getDay()];

    // Find the time slot
    const timeSlot = restaurant.availableTimeSlots
      .find((day) => day.day === dayOfWeek)
      ?.slots.find((slot) => slot.time === time);

    if (!timeSlot) {
      return res.status(400).json({ error: 'Time slot not found' });
    }

    // Check if the time slot has available reservations
    if (timeSlot.currentReservations >= timeSlot.maxReservations) {
      return res.status(400).json({ error: 'No available slots for this time' });
    }

    // Create the reservation
    const reservation = new Reservation({
      userId,
      restaurantId,
      partySize,
      date: reservationDate,
      time,
    });

    // Save the reservation
    await reservation.save();

    // Update the current reservations count
    timeSlot.currentReservations += 1;
    await restaurant.save();

    // Fetch the user
    const user = await User.findById(userId);

    // Send email if notifications are enabled
    if (user.notificationsEnabled) {
      const mailOptions = {
        from: process.env.EMAIL_ADD,
        to: user.email,
        subject: 'New Reservation Created',
        text: `You have reserved a table at ${restaurant.name} on ${date} at ${time} for ${partySize} people.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    }

    res.status(201).json({ message: 'Reservation created successfully', reservation });
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ error: 'Failed to create reservation', details: error.message });
  }
});

//get the reservations of the currently logged in user
app.get("/reservations/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const reservations = await Reservation.find({ userId }).populate("restaurantId");
    res.status(200).json({ reservations });
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ error: "Failed to fetch reservations" });
  }
});



// Delete a reservation
app.delete("/reservations/:userId/:reservationId", async (req, res) => {
  const { userId, reservationId } = req.params;

  try {
    const reservation = await Reservation.findOne({ _id: reservationId, userId });
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    const restaurant = await Restaurant.findById(reservation.restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    const reservationDate = new Date(reservation.date);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = days[reservationDate.getDay()];

    const timeSlot = restaurant.availableTimeSlots
      .find((day) => day.day === dayOfWeek)
      ?.slots.find((slot) => slot.time === reservation.time);

    if (timeSlot && timeSlot.currentReservations > 0) {
      timeSlot.currentReservations -= 1;
      await restaurant.save();
    }

    await Reservation.findByIdAndDelete(reservationId);

    res.status(200).json({ message: "Reservation canceled successfully" });
  } catch (error) {
    console.error("Error canceling reservation:", error);
    res.status(500).json({ error: "Failed to cancel reservation", details: error.message });
  }
});

app.post('/favorites', async (req, res) => {
  const { userId, restaurantId } = req.body;

  try {
    // Check if the favorite already exists
    const existingFavorite = await Favorite.findOne({ userId, restaurantId });
    if (existingFavorite) {
      return res.status(400).json({ error: 'Already in favorites' });
    }

    // Create a new favorite
    const favorite = new Favorite({ userId, restaurantId });
    await favorite.save();

    // Fetch the user and restaurant details
    const user = await User.findById(userId);
    const restaurant = await Restaurant.findById(restaurantId);

    // Send email if notifications are enabled
    if (user.notificationsEnabled) {
      const mailOptions = {
        from: process.env.EMAIL_ADD,
        to: user.email,
        subject: 'New Favorite Added',
        text: `You have added ${restaurant.name} to your favorites.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    }

    // Fetch all favorites for the user
    const favorites = await Favorite.find({ userId }).populate('restaurantId');

    res.status(201).json({ message: 'Added to favorites', favorites });
  } catch (error) {
    console.error('Error adding to favorites:', error);
    res.status(500).json({ error: 'Failed to add to favorites', details: error.message });
  }
});

//remove favorites
app.delete("/favorites/:userId/:restaurantId", async (req, res) => {
  const { userId, restaurantId } = req.params;

  try {
    // Remove the favorite
    await Favorite.findOneAndDelete({ userId, restaurantId });

    // Fetch all favorites for the user
    const favorites = await Favorite.find({ userId });

    res.status(200).json({ message: "Removed from favorites", favorites });
  } catch (error) {
    console.error("Error removing from favorites:", error);
    res.status(500).json({ error: "Failed to remove from favorites" });
  }
});

//get each user;s favorites
app.get("/favorites/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const favorites = await Favorite.find({ userId }).populate("restaurantId");
    res.status(200).json({ favorites });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
});


app.post("/create-payment-intent", async (req, res) => {
  console.log("Received request to create payment intent");
  console.log("Request body:", req.body);

  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ["card"],
    });

    console.log("Payment intent created:", paymentIntent.id);
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).send({ error: error.message });
  }
});


// Start server
app.listen(PORT, () => console.log(`Server running on http://192.168.18.15:${PORT}`));