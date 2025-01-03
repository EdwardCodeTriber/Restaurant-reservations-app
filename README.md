# ThaZulu 🍽️

A modern restaurant reservation platform built with React Native, making it easy for users to discover, book, and review their favorite restaurants.

## 📱 Features

- **Restaurant Discovery**: Browse and search through a curated list of restaurants
- **Real-time Booking**: Check availability and make instant reservations
- **Secure Payments**: Integrated Stripe payment processing
- **User Profiles**: Personalized experience with favorite restaurants and booking history
- **Reviews & Ratings**: Share your dining experiences
- **Interactive Maps**: Find restaurants near you
- **Smart Scheduling**: View available time slots in real-time

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- React Native development environment
- MongoDB
- Stripe account for payments
- Expo CLI

### Installation

1. Clone the repository:
```bash
git clone https://github.com/EdwardCodeTriber/Restaurant-reservations-app.git
cd restaurant-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```
EXPO_PUBLIC_API_URL=your_api_url
STRIPE_PUBLIC_KEY=your_stripe_public_key
```

4. Start the development server:
```bash
npx expo start
```

## 🏗️ Frontend Project Structure

```
Restaurant-reservations-app/
├── restaurant-app/
│   ├── components/
│   │   └── LocationMarker.js
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   └── BookingScreen.js
│   │   └── ProfileScreen.js


│   ├── utils/
│   └── config/
├── assets/
└── App.js
```

## 💻 Tech Stack

- **Frontend**: React Native
- **Backend**: Node.js
- **Database**: MongoDB
- **Payment**: Stripe
- **Maps**: React Native Maps
- **HTTP Client**: Axios
- **State Management**: React Hooks

## 🔑 Key Features Implementation

### Restaurant Booking Flow
1. Browse available restaurants
2. Select date and party size
3. Choose from available time slots
4. Enter payment details
5. Receive booking confirmation

### User Features
- Save favorite restaurants
- View booking history
- Write and read reviews
- Manage profile settings

## 📝 Environment Variables

Required environment variables:
```
EXPO_PUBLIC_API_URL=your_api_url
STRIPE_PUBLIC_KEY=your_stripe_public_key
MONGODB_URI=your_mongodb_uri
```

## 🛠️ Development

### Running Tests
```bash
npm test
```

### Building for Production
```bash
expo build:android
# or
expo build:ios
```

## 🐛 Known Issues

- Party size selection limited to predefined values
- Restaurant images require specific format and size
- Payment processing may have delays during high traffic

## 🔮 Future Enhancements

- [ ] Implement push notifications for booking reminders
- [ ] Add loyalty program features
- [ ] Enable social sharing of restaurant experiences
- [ ] Add multi-language support
- [ ] Implement advanced search filters

## 📄 API Documentation

Key endpoints:

```javascript
GET /restaurants          // Fetch all restaurants
POST /reservations       // Create new reservation
GET /me                  // Fetch user profile
POST /favorites         // Add restaurant to favorites
```

Full API documentation available in the `docs` folder.

## 🔒 Security

- User authentication via cookie-based authentication
- Secure payment processing with Stripe
- Data encryption for sensitive information
- Input validation and sanitization

## 📱 Supported Platforms

- iOS 11.0 or later
- Android 5.0 (API 21) or later

## 👏 Acknowledgments

- Restaurant icons from [FontAwesome](https://fontawesome.com)
- Map integration powered by [React Native Maps](https://github.com/react-native-maps/react-native-maps)
- Payment processing by [Stripe](https://stripe.com)

## 🔄 Version History

- 1.0.0
  - Initial Release
  - Basic booking functionality
- 1.1.0
  - Added reviews system
  - Improved payment flow

## 👥 Team

- Co-developers - [Thapelo Somo, Siphelele Zulu]
- UI/UX Designer - [Thapelo Somo]
- Backend Developer - [Siphelele Zulu, Thapelo Somo]
- 
## Documentation
- User guide: https://docs.google.com/document/d/106QBC0LKhFb0bqJDGuLp1ge4R0c2MYMw1Rb6aCOfegg/edit?usp=sharing
- Dev Docs: https://docs.google.com/document/d/1eSqUvb6mCjN4iM3MRObD31G21DYFGkESjZNVQt3zqM4/edit?usp=sharing

