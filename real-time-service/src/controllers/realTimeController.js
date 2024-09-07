const { broadcastNotification } = require('../sockets/socketHandler');

// Example controller function for a real-time notification broadcast
exports.sendNotification = (req, res) => {
    const { message } = req.body;
    const notification = { message };

    broadcastNotification(notification);

    res.status(200).json({
        success: true,
        message: 'Notification broadcasted',
        notification,
    });
};
