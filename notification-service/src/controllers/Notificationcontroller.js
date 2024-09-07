const Notification = require('../models/Notification');
const { publishToQueue } = require('../config/rabbitmq');
const mongoose = require('mongoose');

// Create a new notification
exports.createNotification = async (req, res) => {
    const { message } = req.body;
    const userId = req.user.id; // Assuming user info is available from JWT authentication

    try {
        const notification = new Notification({
            userId,
            message,
            read: false,
            createdAt: Date.now(),
        });

        // Save to the database
        await notification.save();

        // Publish to RabbitMQ
        publishToQueue(notification);

        res.status(201).json({ message: 'Notification created and queued.', notification });
    } catch (error) {
        console.error('Error creating notification:', error);
        res.status(500).json({ error: 'Failed to create notification' });
    }
};

// Get all notifications for the authenticated user
exports.getNotifications = async (req, res) => {
    const userId = req.user.id;

    try {
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json({ notifications });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
};

// Get a specific notification by ID
exports.getNotificationById = async (req, res) => {

    
    const id = req.params.id; // Fetch the ID from URL parameters
    const userId = req.user.id; // Fetch the userId from query parameters

    console.log("Received ID from request:", id); // Log the received ID
    console.log("Received userId from request:", userId); // Log the received userId
    

    try {
        // Check if the ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid notification ID' });
        }

        const notification = await Notification.findOne({ _id: id, userId });

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        res.status(200).json({ notification });
    } catch (error) {
        console.error('Error fetching notification by ID:', error.message);
        res.status(500).json({ error: 'Failed to fetch notification by ID' });
    }
};


// Mark a notification as read
exports.markNotificationAsRead = async (req, res) => {
    const { id } = req.params;
    

    try {
        const notification = await Notification.findOneAndUpdate(
            { _id: id},
            { read: true },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found or unauthorized' });
        }

        res.status(200).json({ message: 'Notification marked as read', notification });
    } catch (error) {
        console.error('Error marking notification as read:', error);
        res.status(500).json({ error: 'Failed to mark notification as read' });
    }
};
