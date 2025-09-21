import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import VerifyOTP from "./components/VerifyOTP";
import ForgotPassword from "./components/ForgotPassword"
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
