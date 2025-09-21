import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRecycle } from "react-icons/fa";
import axios from "axios";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, mode } = location.state || {};

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      // Call backend verify endpoint
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", { email, otp });
      console.log("Email:", email, "OTP:", otp);
      setMessage(res.data.message);

      if (mode === "register") {
        // ✅ Registration flow → go to dashboard
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else if (mode === "reset") {
        // ✅ Password reset flow → redirect to ResetPassword page
         //localStorage.setItem("resetToken", res.data.resetToken);
        setTimeout(() => {
          navigate("/reset-password", { state: {email} });
        }, 1000);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side */}
      <div className="w-1/2 flex flex-col justify-center px-16 bg-gray-50 ">
        <h1 className="text-2xl font-bold text-green-800 flex items-center mb-6">
          <FaRecycle className="text-green-600 mr-2" /> WasteZero
        </h1>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Verify Your Email</h2>
        <p className="text-gray-600 mb-8">
          {mode === "register"
            ? "Enter the OTP sent to your email to complete registration."
            : "Enter the OTP sent to your email to reset your password."}
        </p>
      </div>

      {/* Right side - OTP form */}
      <div className="w-1/2 flex flex-col justify-start mt-20 px-16">
        <h2 className="text-xl font-semibold mb-4 mt-20">Enter OTP</h2>
        <form className="space-y-2" onSubmit={handleVerify}>
          {message && <p className="text-red-600 font-semibold">{message}</p>}

          <div className="flex items-center border rounded-md px-3">
            <input
              type="text"
              placeholder="6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}
