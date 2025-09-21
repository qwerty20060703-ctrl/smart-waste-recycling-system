import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String,
  location: String,
  role: String,
  otp: String, // store OTP as string
  otpExpiry: Date, // ✅ add this line
  isVerified: { type: Boolean, default: false }
});

export default mongoose.model("User", userSchema);
