import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { sendOTP } from "../utils/mailer.js";

const router = express.Router();

// 📌 REGISTER USER
router.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Create user with hashed password + OTP
    const user = new User({
      email,
      password: hashedPassword,
      role,
      otp,
      otpExpiry: Date.now() + 10 * 60 * 1000, // valid for 10 min
    });

    await user.save();

    // Send OTP
    const emailSent = await sendOTP(email, otp);
    if (!emailSent) {
      return res.status(500).json({ message: "User registered but failed to send OTP" });
    }

    res.status(201).json({ message: "User registered, OTP sent to email" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
});

// 📌 VERIFY OTP
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.otp !== otp || Date.now() > user.otpExpiry) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ message: "OTP verification failed", error: error.message });
  }
});

// 📌 FORGOT PASSWORD
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate OTP for reset
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Send OTP
    const emailSent = await sendOTP(email, otp);
    if (!emailSent) {
      return res.status(500).json({ message: "Error sending OTP" });
    }

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Failed to send OTP", error: error.message });
  }
});
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.otp !== otp || Date.now() > user.otpExpiry) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // ✅ OTP verified, create a temporary reset token
    const resetToken = Math.random().toString(36).substring(2, 15); // simple random token
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // valid 15 minutes
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.status(200).json({ message: "OTP verified", resetToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "OTP verification failed", error: error.message });
  }
});


// 3️⃣ Reset Password

router.post("/reset-password", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    user.password = await bcrypt.hash(password, 10);
    //user.resetToken = null;
    //user.resetTokenExpiry = null;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Password reset failed", error: error.message });
  }
});


// 📌 LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: "Please verify your email with OTP first" });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

export default router;
