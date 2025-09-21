// testEmail.js
import { transporter } from "./utils/mailer.js";

transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_USER,
  subject: "Test Email",
  text: "This is a test email"
})
.then(() => console.log("✅ Email sent!"))
.catch(err => console.log("❌ Email error:", err));
