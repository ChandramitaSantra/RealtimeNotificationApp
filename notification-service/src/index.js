const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const notificationRoutes = require('./routes/NotificationRoutes');
const consumeMessages = require('../workers/NotificationWorker');
const { connectRabbitMQ } = require('./config/rabbitmq');

const cors = require('cors');


dotenv.config();

const app = express();

// Body parser
app.use(express.json());

app.use(cors());

// Connect to MongoDB
connectDB();

connectRabbitMQ();

consumeMessages();

// Notification routes
app.use('/api/notifications', notificationRoutes);



const PORT = process.env.PORT || 5001;

app.listen(PORT, () =>
	console.log(`Notification Service running on port ${PORT}`)
);
