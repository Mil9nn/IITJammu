// scripts/createAdmin.js
import "dotenv/config";
import { connect } from "mongoose";
import User from "../models/User.js";

const createAdminUser = async () => {
  try {
    // Connect to the database
    await connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
    
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    // Validate environment variables
    if (!adminUsername || !adminPassword) {
      console.error("❌ ADMIN_USERNAME and ADMIN_PASSWORD must be set in .env file");
      process.exit(1);
    }
    
    // Check if admin already exists
    const adminExists = await User.findOne({ username: adminUsername });
    
    if (adminExists) {
      console.log("Admin user already exists");
      process.exit(0);
    }
    
    // Create new admin user
    const adminUser = new User({
      username: adminUsername,
      password: adminPassword, // This will be hashed by the pre-save hook
      isAdmin: true
    });
    
    await adminUser.save();
    console.log("✅ Admin user created successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
    process.exit(1);
  }
};

createAdminUser();