
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../src/models/User.js";

dotenv.config();

const updateAdminCredentials = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const newEmail = process.env.NEW_ADMIN_EMAIL;
    const newPassword = process.env.NEW_ADMIN_PASSWORD;

    if (!newEmail || !newPassword) {
      throw new Error("New admin credentials are missing");
    }

    if (newPassword.length < 12) {
      throw new Error("Use a password of at least 12 characters");
    }

    // Find the existing admin account
    const admin = await User.findOne({ role: "admin" });

    if (!admin) {
      throw new Error("Existing admin account not found");
    }

    // Check whether the new email is already used
    const existingUser = await User.findOne({
      email: newEmail.toLowerCase(),
      _id: { $ne: admin._id },
    });

    if (existingUser) {
      throw new Error("This email is already used by another account");
    }

    // Update existing admin account
    admin.email = newEmail.toLowerCase();
    admin.password = await bcrypt.hash(newPassword, 12);

    await admin.save();

    console.log("Admin credentials updated successfully");
  } catch (error) {
    console.error("Admin update failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

updateAdminCredentials();
