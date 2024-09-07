const amqp = require('amqplib/callback_api');
const Notification = require('../src/models/Notification');

const QUEUE_NAME = 'notificationQueue';

// Function to consume messages from RabbitMQ
const consumeMessages = () => {
    amqp.connect(process.env.RABBITMQ_URI, (error0, connection) => {
        if (error0) {
            throw error0;
        }

        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }

            channel.assertQueue(QUEUE_NAME, {
                durable: true,
            });

            channel.consume(QUEUE_NAME, async (msg) => {
                if (msg !== null) {
                    const notification = JSON.parse(msg.content.toString());
                    console.log('Received message from queue:', notification);

                    // Process the notification (e.g., send push notification)
                    // ...

                    channel.ack(msg);
                }
            });
        });
    });
};

module.exports = consumeMessages;
