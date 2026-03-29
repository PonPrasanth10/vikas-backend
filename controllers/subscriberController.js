const Subscriber = require('../models/Subscriber');
const { sendConfirmationEmail, sendProductUpdateEmail } = require('../utils/emailService');

// POST /api/subscribe
exports.subscribe = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address' });
    }

    const existing = await Subscriber.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ success: false, message: 'This email is already subscribed' });
    }

    await Subscriber.create({ email: email.toLowerCase() });

    try {
      await sendConfirmationEmail(email)
      console.log('Confirmation email sent to:', email)
    } catch (emailErr) {
      console.error('Confirmation email failed:', emailErr.message)
    }

    res.status(201).json({ success: true, message: 'Successfully subscribed!' });
  } catch (error) {
    next(error);
  }
};

// POST /api/subscribe/notify - Send product update to all subscribers
exports.notifySubscribers = async (req, res, next) => {
  try {
    const { productName, productPrice, adminKey } = req.body;

    if (adminKey !== process.env.ADMIN_NOTIFY_KEY) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const subscribers = await Subscriber.find({});
    if (subscribers.length === 0) {
      return res.status(200).json({ success: true, message: 'No subscribers to notify' });
    }

    await sendProductUpdateEmail(subscribers, productName, productPrice);

    res.status(200).json({
      success: true,
      message: `Notified ${subscribers.length} subscribers`,
    });
  } catch (error) {
    next(error);
  }
};
