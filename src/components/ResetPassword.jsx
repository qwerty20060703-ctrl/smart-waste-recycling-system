// ResetPassword.jsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRecycle } from "react-icons/fa";
import axios from "axios";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (!email) {
    navigate("/forgot-password");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/reset-password", {
        email,
        password,
      });

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Password reset failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side - Branding */}
      <div className="w-1/2 flex flex-col justify-center px-16 bg-gray-50">
        <h1 className="text-2xl font-bold text-green-800 flex items-center mb-6">
          <FaRecycle className="text-green-600 mr-2" /> WasteZero
        </h1>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Reset Your Password</h2>
        <p className="text-gray-600 mb-8">
          Enter your new password to regain access to your account securely.
        </p>
      </div>

      {/* Right side - Reset form */}
      <div className="w-1/2 flex flex-col justify-start mt-20 px-16">
        <h2 className="text-xl font-semibold mb-4 mt-20">Create New Password</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {message && <p className="text-green-600 font-semibold">{message}</p>}
          {error && <p className="text-red-600 font-semibold">{error}</p>}

          <div className="flex items-center border rounded-md px-3">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 focus:outline-none"
              required
            />
          </div>

          <div className="flex items-center border rounded-md px-3">
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
