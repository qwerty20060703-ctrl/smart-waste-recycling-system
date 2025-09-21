import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import AdminPanel from './components/AdminPanel/AdminPanel';
import SchedulePickup from './components/SchedulePickup/SchedulePickup';
import Opportunities from './components/Opportunities/Opportunities';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Render the appropriate page based on currentPage state
  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <Dashboard currentPage={currentPage} onPageChange={handlePageChange} />;
      case 'schedule':
        return <SchedulePickup currentPage={currentPage} onPageChange={handlePageChange} />;
      case 'opportunities':
        return <Opportunities currentPage={currentPage} onPageChange={handlePageChange} />
      case 'messages':
        return <messages />
      case 'impact':
        return <impact />
      case 'profile':
        return <profile />
      case 'setting':
        return <setting />
      case 'help':
        return <help />
      case 'admin':
        return <AdminPanel />;
    }
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <Sidebar 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
