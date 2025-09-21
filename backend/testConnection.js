import mongoose from "mongoose";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Test MongoDB
const testMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
  }
};

// Test Email
const testEmail = async () => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();
    console.log("✅ Email transporter working!");
  } catch (err) {
    console.error("❌ Email transporter failed:", err.message);
  }
};

testMongo();
testEmail();
