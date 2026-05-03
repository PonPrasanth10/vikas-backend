require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
  try {
    const DB_URI = `mongodb+srv://vikassilksrjpm_db_user:${process.env.DB_PASSWORD}@cluster0.npfu9oo.mongodb.net/vikassilks?retryWrites=true&w=majority`;
    await mongoose.connect(DB_URI);
    console.log('Connected to MongoDB');

    await User.deleteOne({ role: 'admin' });

    const admin = await User.create({
      username: 'Admin',
      email: 'admin@vikassilks.com',
      password: 'Admin@1234',
      role: 'admin',
    });

    console.log('Admin created successfully');
    console.log('Email   :', admin.email);
    console.log('Password: Admin@1234');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
