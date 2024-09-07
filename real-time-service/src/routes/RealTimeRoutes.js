const express = require('express');
const { sendNotification } = require('../controllers/realTimeController');

const router = express.Router();

// Route to manually trigger a real-time notification (optional)
router.post('/send', sendNotification);

module.exports = router;
