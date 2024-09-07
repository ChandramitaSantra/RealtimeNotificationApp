const amqp = require('amqplib');

let channel;

async function connectToRabbitMQ() {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        channel = await connection.createChannel();
        await channel.assertQueue('notifications', { durable: true });
        console.log('Connected to RabbitMQ and listening for messages...');
    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error);
    }
}

function consumeMessages(onMessage) {
    if (!channel) return;

    channel.consume('notifications', (msg) => {
        if (msg !== null) {
            const notification = JSON.parse(msg.content.toString());
            onMessage(notification);
            channel.ack(msg);
        }
    });
}

module.exports = {
    connectToRabbitMQ,
    consumeMessages
};
