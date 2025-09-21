import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
// Authentication Pages
import AuthPage from './components/AuthPage';
import VerifyOTP from './components/VerifyOTP';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

// Dashboard Components
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import AdminPanel from './components/AdminPanel/AdminPanel';
import SchedulePickup from './components/SchedulePickup/SchedulePickup';
import Opportunities from './components/Opportunities/Opportunities';

// A simple function to check if a user is authenticated
// In a real app, this would be more complex (e.g., checking for a token)
const useAuth = () => {
  // For now, we'll just use a simple state variable.
  // We'll improve this in the next step.
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return { isAuthenticated, setIsAuthenticated };
};

// A component to protect routes that require authentication
const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/" />;
  }
  return children;
};


// The main App component
function App() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const location = useLocation();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Conditionally render the sidebar
  const shouldShowSidebar = isAuthenticated && location.pathname.startsWith('/dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard currentPage={currentPage} onPageChange={handlePageChange} />;
      case 'schedule':
        return <SchedulePickup currentPage={currentPage} onPageChange={handlePageChange} />;
      case 'opportunities':
        return <Opportunities currentPage={currentPage} onPageChange={handlePageChange} />
      case 'admin':
        return <AdminPanel />;
      default:
        return <Dashboard currentPage={currentPage} onPageChange={handlePageChange} />;
    }
  };


  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      {shouldShowSidebar && (
        <Sidebar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<AuthPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Dashboard and other protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                {renderPage()}
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;