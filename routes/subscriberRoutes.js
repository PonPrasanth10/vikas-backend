const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { subscribe, notifySubscribers } = require('../controllers/subscriberController');

const subscribeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: { success: false, message: 'Too many requests, please try again later' },
});

router.post('/subscribe', subscribeLimiter, subscribe);
router.post('/subscribe/notify', notifySubscribers);

module.exports = router;
