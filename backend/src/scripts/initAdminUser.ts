import mongoose from 'mongoose';
import { User } from '../models/user.model';
import dotenv from 'dotenv';

dotenv.config();

const initAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/code_input_db');

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME || 'Admin User';

    if (!adminEmail || !adminPassword) {
      console.error('Admin email and password must be provided in environment variables.');
      process.exit(1);
    }

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    const adminUser = await User.createAdminUser({
      email: adminEmail,
      password: adminPassword,
      name: adminName
    });

    console.log('Admin user created successfully:', adminUser.email);
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await mongoose.disconnect();
  }
};

initAdminUser();