const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,           // true for port 465
  family: 4,              // force IPv4 — fixes Render/production ENETUNREACH errors
  auth: {
    user: process.env.EMAIL_USER.trim(),
    pass: process.env.EMAIL_PASS.replace(/\s/g, ''), // strips spaces from App Password
  },
  connectionTimeout: 10000,  // 10s to establish connection
  greetingTimeout: 10000,    // 10s to receive greeting
  socketTimeout: 15000,      // 15s socket inactivity timeout
});

// Verify transporter on startup
transporter.verify((error) => {
  if (error) {
    console.error('Email transporter error:', error.message);
  } else {
    console.log('Email transporter ready');
  }
});

// Send confirmation email to new subscriber
const sendConfirmationEmail = async (email) => {
  await transporter.sendMail({
    from: `"Vikas Silks" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Welcome to Vikas Silks Newsletter! 🎉',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2B4F9E;">Vikas Silks</h1>
        </div>
        <h2 style="color: #333;">You're subscribed! 🎊</h2>
        <p style="color: #555; line-height: 1.6;">
          Thank you for subscribing to Vikas Silks newsletter. You'll now receive:
        </p>
        <ul style="color: #555; line-height: 2;">
          <li>New saree collection drops</li>
          <li>Exclusive offers and discounts</li>
          <li>Festival special deals</li>
        </ul>
        <div style="text-align: center; margin-top: 30px;">
          <a href="https://wa.link/i709qd" 
             style="background-color: #e53e3e; color: white; padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: bold;">
            Shop Now
          </a>
        </div>
        <p style="color: #999; font-size: 12px; margin-top: 30px; text-align: center;">
          © 2026 Vikas Silks. All rights reserved.
        </p>
      </div>
    `,
  });
};

// Send bulk update email to all subscribers
const sendBulkEmail = async (subscribers, subject, htmlContent) => {
  const emailList = subscribers.map((s) => s.email);

  await transporter.sendMail({
    from: `"Vikas Silks" <${process.env.EMAIL_USER}>`,
    bcc: emailList,
    subject,
    html: htmlContent,
  });
};

// Reusable product update email template
const sendProductUpdateEmail = async (subscribers, productName, productPrice) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #2B4F9E;">Vikas Silks</h1>
      </div>
      <h2 style="color: #333;">New Arrival! 🛍️</h2>
      <p style="color: #555; line-height: 1.6;">
        We just added a stunning new saree to our collection:
      </p>
      <div style="background: #FFF7F2; border-radius: 10px; padding: 20px; margin: 20px 0; text-align: center;">
        <h3 style="color: #2B4F9E; margin: 0 0 10px 0;">${productName}</h3>
        <p style="color: #e53e3e; font-size: 20px; font-weight: bold; margin: 0;">₹${productPrice}</p>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <a href="https://wa.link/i709qd"
           style="background-color: #e53e3e; color: white; padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: bold;">
          View Collection
        </a>
      </div>
      <p style="color: #999; font-size: 12px; margin-top: 30px; text-align: center;">
        © 2026 Vikas Silks. You're receiving this because you subscribed to our newsletter.
      </p>
    </div>
  `;

  await sendBulkEmail(subscribers, `New Arrival: ${productName} 🎉`, html);
};

module.exports = { sendConfirmationEmail, sendBulkEmail, sendProductUpdateEmail };
