const amqp = require('amqplib');

// RabbitMQ connection and channel
let channel;

// Function to connect to RabbitMQ
async function connectRabbitMQ() {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        channel = await connection.createChannel();
        
        // Ensure the "notifications" queue exists
        await channel.assertQueue('notifications', { durable: true });
        
        console.log('Connected to RabbitMQ and queue asserted.');
    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error);
        throw error;
    }
}

// Function to publish a notification to the RabbitMQ queue
async function publishToQueue(notification) {
    if (!channel) {
        console.error('Cannot publish to queue: channel not initialized.');
        return;
    }

    try {
        // Convert notification object to a Buffer (stringify the JSON)
        const notificationBuffer = Buffer.from(JSON.stringify(notification));
        
        // Publish to the "notifications" queue
        await channel.sendToQueue('notifications', notificationBuffer, {
            persistent: true, // Ensure the message persists even if RabbitMQ restarts
        });

        console.log('Notification published to queue:', notification);
    } catch (error) {
        console.error('Error publishing to RabbitMQ queue:', error);
    }
}

module.exports = {
    connectRabbitMQ,
    publishToQueue,
};