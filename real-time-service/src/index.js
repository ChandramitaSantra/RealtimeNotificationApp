require('dotenv').config();
const express = require('express');
const http = require('http');
const { connectToRabbitMQ } = require('./config/rabbitmq');
const { initializeSocket } = require('./sockets/socketHandler');
const { setupNotificationListener } = require('./events/notificationEvents');

const RealTimeRoutes = require('./routes/RealTimeRoutes');

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json()); // Body parser to parse JSON payloads

// Notification Routes
app.use('/api/realtime', RealTimeRoutes);


const PORT = process.env.PORT || 5002;

// Connect to RabbitMQ
connectToRabbitMQ()
    .then(() => {
        // Initialize WebSocket/Socket.IO
        initializeSocket(server);

        // Start listening for notification messages
        setupNotificationListener();

        // Start the server
        server.listen(PORT, () => {
            console.log(`Real-time notification service running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to start real-time service due to RabbitMQ connection issue:', err);
    });
