import nodemailer from "nodemailer";

export const sendOTP = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS, // your 16-digit app password
      },
    });

    const mailOptions = {
      from: `"WasteZero" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP for WasteZero Signup",
      text: `Your OTP is: ${otp}. It is valid for 10 minutes.`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ OTP sent: ", info.response);
    return true;
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    return false;
  }
};
