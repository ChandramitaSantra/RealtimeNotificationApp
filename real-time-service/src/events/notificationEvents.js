const { consumeMessages } = require('../config/rabbitmq');
const { broadcastNotification } = require('../sockets/socketHandler');

function setupNotificationListener() {
    consumeMessages((notification) => {
        console.log('Received notification from queue:', notification);
        broadcastNotification(notification);
    });
}

module.exports = {
    setupNotificationListener
};
