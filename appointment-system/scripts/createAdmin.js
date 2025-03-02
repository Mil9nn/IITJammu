// scripts/createAdmin.js
import "dotenv/config";
import { connect } from "mongoose";
import User from "../models/User.js";

const createAdminUsers = async () => {
  try {
    // Connect to the database
    await connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
    
    // Create two admins
    const admins = [
      {
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD,
        adminName: 'Admin One'
      },
      {
        username: process.env.ADMIN02_USERNAME,
        password: process.env.ADMIN02_PASSWORD,
        adminName: 'Admin Two'
      }
    ];
    
    for (const adminData of admins) {
      // Check if admin already exists
      const adminExists = await User.findOne({ username: adminData.username });
      
      if (adminExists) {
        console.log(`Admin user ${adminData.username} already exists`);
        continue;
      }
      
      // Create new admin user
      const adminUser = new User({
        username: adminData.username,
        password: adminData.password, // This will be hashed by the pre-save hook
        adminName: adminData.adminName,
        isAdmin: true
      });
      
      await adminUser.save();
      console.log(`✅ Admin user ${adminData.username} created successfully`);
    }
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin users:", error);
    process.exit(1);
  }
};

createAdminUsers();