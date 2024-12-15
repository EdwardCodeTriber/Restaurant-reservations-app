const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcrypt');
const cors = require('cors');
const reservationsRoute = require("./routes/reservations");

const app = express();
const PORT = 3000;

// MongoDB connection
mongoose.connect('mongodb+srv://sphllzulu:L5rv9SsjPLBeIqiY@cluster10.6e0kt.mongodb.net/', {
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
    origin: ['exp://192.168.0.104:8082', 'http:// 192.168.0.104:3000'], 
    credentials: true,
  })
);

// Session configuration
app.use(
  session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://sphllzulu:L5rv9SsjPLBeIqiY@cluster10.6e0kt.mongodb.net/' }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

// User schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  role: {
    type: String,
    
    default: 'USER'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

// Restaurant schema
const restaurantSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  cuisine: String,
  rating: Number,
  pricePerReservation: Number,
  dressCode: String,
  description: String,
  menu: [
    {
      name: String,
      image: String,
    },
  ],
  images: [String],
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

// API endpoint to get all restaurants
app.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch restaurants' });
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

app.use("/reservations", reservationsRoute);

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));