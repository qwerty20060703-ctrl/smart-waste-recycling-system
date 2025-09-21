import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaMapMarkerAlt,
  FaRecycle,
} from "react-icons/fa";
import axios from "axios";

export default function AuthPage({ setIsAuthenticated }) { // Accept setIsAuthenticated as a prop
  const navigate = useNavigate();
  const [tab, setTab] = useState("signup");
  const [role, setRole] = useState("Volunteer");

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    bio: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSignupChange = (e) =>
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  const handleLoginChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (signupData.password !== signupData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        { ...signupData, role }
      );
      setMessage(response.data.message);
      setSignupData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        location: "",
        bio: "",
      });

      // Redirect to VerifyOTP page with email
      navigate("/verify-otp", { state: { email: signupData.email , mode: "register"} });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        loginData
      );
      setMessage(response.data.message);

      // On successful login, update auth state and navigate to dashboard
      setIsAuthenticated(true);
      navigate("/dashboard");
      
    } catch (err) { // This is the corrected line with the opening brace
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side - Branding */}
      <div className="w-1/2 flex flex-col justify-start pt-24 px-20 bg-gray-50">
        <h1 className="text-3xl md:text-4xl font-bold text-green-800 flex items-center mb-6">
          <img
            src="/logo.png"
            alt="WasteZero"
            className="w-12 h-12 mr-3 rounded-full"
          />{" "}
          WasteZero
        </h1>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
          Join the Recycling Revolution
        </h2>
        <p className="text-gray-600 mb-8">
          WasteZero connects volunteers, NGOs, and administrators to schedule
          pickups, manage recycling opportunities, and make a positive impact on
          our environment.
        </p>

        {/* Features */}
        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center">
            <img
              src="/recycling-3.png"
              alt="Schedule Pickups"
              className="w-30 h-30 mb-2 rounded-xl"
            />
            <h3 className="font-semibold text-gray-700">Schedule Pickups</h3>
            <p className="text-sm text-gray-500">
              Easily arrange waste collection.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <img
              src="/recycling-2.png"
              alt="Track Impact"
              className="w-30 h-30 mb-2 rounded-xl"
            />
            <h3 className="font-semibold text-gray-700">Track Impact</h3>
            <p className="text-sm text-gray-500">
              Monitor your environmental contribution.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <img
              src="/recycling-workers-1.png"
              alt="Volunteer"
              className="w-30 h-30 mb-2 rounded-xl"
            />
            <h3 className="font-semibold text-gray-700">Volunteer</h3>
            <p className="text-sm text-gray-500">Join recycling initiatives.</p>
          </div>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="w-1/2 flex flex-col justify-start mt-16 px-16">
        {/* Tabs */}
        <div className="flex gap-2 mt-3 mb-6">
          <button
            type="button"
            onClick={() => setTab("login")}
            className={`flex-1 py-2 rounded-md ${
              tab === "login"
                ? "bg-green-600 text-white font-semibold"
                : "bg-gray-100 text-gray-700 hover:bg-green-100"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setTab("signup")}
            className={`flex-1 py-2 rounded-md ${
              tab === "signup"
                ? "bg-green-600 text-white font-semibold"
                : "bg-gray-100 text-gray-700 hover:bg-green-100"
            }`}
          >
            Register
          </button>
        </div>

        {/* Signup */}
        {tab === "signup" && (
          <form className="space-y-2" onSubmit={handleSignupSubmit}>
            {message && (
              <p className="text-green-700 font-semibold">{message}</p>
            )}
            {error && <p className="text-red-600 font-semibold">{error}</p>}
            <h2 className="text-2xl font-bold mb-1">Create an Account </h2>
            <p className="text-gray-500 mb-4">
              Join WasteZero today and help us build a greener tomorrow
            </p>

            <div className="flex items-center border rounded-md px-3">
              <FaUser className="text-gray-500 mr-2" />
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={signupData.fullName}
                onChange={handleSignupChange}
                className="w-full p-2 focus:outline-none"
              />
            </div>

            <div className="flex items-center border rounded-md px-3">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={signupData.email}
                onChange={handleSignupChange}
                className="w-full p-2 focus:outline-none"
              />
            </div>

            <div className="flex items-center border rounded-md px-3">
              <FaLock className="text-gray-500 mr-2" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={signupData.password}
                onChange={handleSignupChange}
                className="w-full p-2 focus:outline-none"
              />
            </div>

            <div className="flex items-center border rounded-md px-3">
              <FaLock className="text-gray-500 mr-2" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={signupData.confirmPassword}
                onChange={handleSignupChange}
                className="w-full p-2 focus:outline-none"
              />
            </div>

            <div className="flex items-center border rounded-md px-3">
              <FaMapMarkerAlt className="text-gray-500 mr-2" />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={signupData.location}
                onChange={handleSignupChange}
                className="w-full p-2 focus:outline-none"
              />
            </div>

            <div className="flex items-center border rounded-md px-3">
              <FaUser className="text-gray-500 mr-2" />
              <input
                type="text"
                name="bio"
                placeholder="Bio"
                value={signupData.bio}
                onChange={handleSignupChange}
                className="w-full p-2 focus:outline-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setRole("Volunteer")}
                className={`px-4 py-2 rounded-full border transition ${
                  role === "Volunteer"
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-700 hover:bg-green-100"
                }`}
              >
                Volunteer
              </button>
              <button
                type="button"
                onClick={() => setRole("NGO")}
                className={`px-4 py-2 rounded-full border transition ${
                  role === "NGO"
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-700 hover:bg-green-100"
                }`}
              >
                NGO
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              Sign Up
            </button>

            <button className="w-full flex items-center justify-center border py-2 rounded-md hover:bg-gray-100">
              <FcGoogle className="mr-2" /> Continue with Google
            </button>
          </form>
        )}

        {/* Login */}
        {tab === "login" && (
          <form className="space-y-2 " onSubmit={handleLoginSubmit}>
            {message && (
              <p className="text-green-700 font-semibold">{message}</p>
            )}
            {error && <p className="text-red-600 font-semibold">{error}</p>}
            <h2 className="text-2xl font-bold mb-3">Welcome Back </h2>
            <p className="text-gray-500 mb-5">
              Log in to continue your journey with WasteZero
            </p>

            <div className="flex items-center border rounded-md mt-3">
              <FaEnvelope className="text-gray-500 ml-3" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={loginData.email}
                onChange={handleLoginChange}
                className="w-full p-2 focus:outline-none"
              />
            </div>

            <div className="flex items-center border rounded-md px-3">
              <FaLock className="text-gray-500 mr-2" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginChange}
                className="w-full p-2 focus:outline-none"
              />
            </div>
            <div className="flex justify-between items-center mt-2">
              <a
                href="/forgot-password"
                className="text-sm text-green-600 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 mb-5 rounded-md hover:bg-green-700 transition"
            >
              Login
            </button>

            <button className="w-full flex items-center justify-center border py-2 mb-5 rounded-md hover:bg-gray-100">
              <FcGoogle className="mr-2" /> Continue with Google
            </button>
          </form>
        )}
      </div>
    </div>
  );
}