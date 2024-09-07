# Real-Time Notification System

This is a full-stack application for real-time notifications built using Socket.IO on the backend with Node.js and React on the frontend. Users can register, log in, receive notifications, and mark them as read.

## Features

- **User Authentication:** Register and login functionality with JWT (JSON Web Tokens).
- **Real-Time Notifications:** Notifications are delivered in real-time using Socket.IO.
- **Mark as Read:** Users can mark notifications as read.
- **Protected Routes:** All notification-related routes are protected using JWT authentication.

## Tech Stack

- **Backend:** Node.js, Express.js, MongoDB, Socket.IO
- **Frontend:** React.js
- **Authentication:** JWT (JSON Web Tokens)
- **Database:** MongoDB

## Prerequisites

Make sure you have the following installed:

- Node.js
- npm or yarn
- MongoDB

## Getting Started

### Installation

1. **Clone the repository:**

   git clone https://github.com/your-repo/real-time-notifications.git
   cd real-time-notifications
   
Install dependencies:

cd auth-service
npm install


cd notification-service
npm install


cd real-time-service
npm install



### Set up the environment variables:
Create a .env file in the backend directory:
env
PORT=5001
MONGO_URI=mongodb://localhost:27017/notifications
JWT_SECRET=your_jwt_secret
Start the MongoDB server:

Make sure your MongoDB is running locally or use a cloud-based MongoDB service.

### Start the auth-service server:
cd auth-service
npm run dev

### Start the notification-service server:
cd notification-service
npm start

### Start the real-time-service server:
cd real-time-service
npm start


API Documentation

### Authentication Routes
http.//localhost:5000
POST /auth/register
Register a new user.
Request Body:
{
  "username": "abc",
  "email": "abc@gmail.com",
  "password": "password123"
}
Response:
{
  "message": "User registered successfully."
}
POST /auth/login
Log in a user and receive a JWT token.
Request Body:
{
  "email": "abc@gmail.com",
  "password": "password123"
}
Response:
{
  "token": "your_jwt_token"
}


### Notification Routes
http.//localhost:5001
POST /api/notifications
Create a new notification (Requires authentication).

Request Header:

Authorization: Bearer <token>
Request Body:
{
  "message": "This is a notification message."
}
Response:
{
  "notification": {
    "_id": "notification_id",
    "message": "This is a notification message.",
    "read": false
  }
}
GET /api/notifications
Get all notifications for the authenticated user.

Request Header:

Authorization: Bearer <token>
Response :
  {
    "_id": "notification_id",
    "message": "This is a notification message.",
    "read": false
  }

GET /api/notifications/:id
Get details of a specific notification by ID (Requires authentication).

Request Header:

Authorization: Bearer <token>/ Add key of authrization in headers and jwt token in value
Response:
{
  "_id": "notification_id",
  "message": "This is a notification message.",
  "read": false
}
PUT /api/notifications/:id
Mark a notification as read (Requires authentication).

Request Header:

Authorization: Bearer <token>
Response:
{
  "_id": "notification_id",
  "message": "This is a notification message.",
  "read": true
}
### Real-Time Notification Routes
POST /api/realtime/send
Send a real-time notification to all connected clients (Optional route).

Request Body:
{
  "message": "Real-time notification."
}
Frontend
The frontend is built using React and Socket.IO to receive real-time notifications.

Running the Frontend
Navigate to the frontend directory:



### Start the development server:
cd notification-app
npm install
npm start


Frontend Features:

The frontend will automatically receive real-time notifications sent from the backend via Socket.IO.
Users can mark notifications as read.
