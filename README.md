ThaZulu App

ThaZulu is a full-stack restaurant reservation application that enables users to discover and book tables at their favorite restaurants. The platform also includes an admin dashboard for managing restaurant details and reservations.

Features

User Features

Browse Restaurants: View a variety of restaurants with details like name, location, cuisine, and available tables.

Make Reservations: Select a date, time, and table to book directly through the app.

User Authentication: Register and log in securely using cookie-based authentication.

Admin Features

Admin Dashboard: Accessible only by admins to manage restaurants and reservations.

Add/Edit/Delete Restaurants: Manage restaurant profiles, including updating their details and table availability.

Reservation Management: View and manage all reservations.

Tech Stack

Backend

Node.js: Server-side logic.

Express.js: API routing and middleware.

MongoDB: Database for storing user, restaurant, and reservation data.

Session-Based Authentication: Secure user sessions stored in cookies.

Frontend

React Native: Cross-platform mobile development.

Expo: Framework for building and running the app.

Material-UI: Styling for React components.

Installation and Setup

Prerequisites

Node.js

MongoDB (local or cloud instance)

Expo CLI

Environment variables configured for:

Database URL

Session secret

Backend Setup

Clone the repository:

git clone https://github.com/your-username/thazulu.git

Navigate to the backend directory:

cd thazulu/backend

Install dependencies:

npm install

Set up environment variables in a .env file:

DATABASE_URL=your_mongo_connection_string
SESSION_SECRET=your_session_secret

Start the server:

npm start

Frontend Setup

Navigate to the frontend directory:

cd thazulu/frontend

Install dependencies:

npm install

Start the Expo development server:

npm start

Use the Expo Go app on your phone to preview the application.

API Endpoints

Authentication

POST /api/auth/register: User registration.

POST /api/auth/login: User login with cookie-based session.

POST /api/auth/logout: User logout.

Restaurants

GET /api/restaurants: Retrieve all restaurants.

GET /api/restaurants/:id: Retrieve a single restaurant by ID.

POST /api/restaurants: Add a new restaurant (Admin only).

PUT /api/restaurants/:id: Update a restaurant’s details (Admin only).

DELETE /api/restaurants/:id: Delete a restaurant (Admin only).

Reservations

POST /api/reservations: Make a new reservation.

GET /api/reservations: Retrieve all reservations (Admin only).

DELETE /api/reservations/:id: Cancel a reservation.

Contributing

Fork the repository.

Create a new branch for your feature:

git checkout -b feature-name

Commit your changes and push to your fork.

Submit a pull request.
