const express = require('express');

const {
	createNotification,
	 getNotifications,
	 getNotificationById,
	 markNotificationAsRead
} = require('../controllers/Notificationcontroller');
const authenticate = require('../middlewares/authMiddleware');
const router = express.Router();

// Routes for notifications

// Create a new notification
router.post('/', authenticate, createNotification);

//  Get all notifications for the authenticated user
 router.get('/', authenticate, getNotifications);

// // Get details of a specific notification by ID
router.get('/:id', authenticate, getNotificationById);


// // Mark a notification as read
 router.put('/:id',   markNotificationAsRead);

module.exports = router;
