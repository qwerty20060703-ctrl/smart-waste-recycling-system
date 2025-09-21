// ForgotPassword.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRecycle } from "react-icons/fa";
import axios from "axios";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      setMessage(res.data.message);

      // Navigate to verify OTP page
      setTimeout(() => {
        navigate("/verify-otp", { state: { email, mode: "reset" } });
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Error sending OTP");
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side - Branding */}
      <div className="w-1/2 flex flex-col justify-center px-16 bg-gray-50">
        <h1 className="text-2xl font-bold text-green-800 flex items-center mb-6">
          <FaRecycle className="text-green-600 mr-2" /> WasteZero
        </h1>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Forgot Your Password?</h2>
        <p className="text-gray-600 mb-8">
          No worries! Enter your email and we’ll send you an OTP to reset your password securely.
        </p>
      </div>

      {/* Right side - Forgot Password Form */}
      <div className="w-1/2 flex flex-col justify-start mt-20 px-16">
        <h2 className="text-xl font-semibold mb-4 mt-20">Reset Password Request</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {message && <p className="text-green-600 font-semibold">{message}</p>}
          {error && <p className="text-red-600 font-semibold">{error}</p>}

          <div className="flex items-center border rounded-md px-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              className="w-full p-2 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
}
