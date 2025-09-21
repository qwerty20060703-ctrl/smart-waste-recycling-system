import React from 'react';
import './Sidebar.css';
import { FaRecycle, FaCalendarAlt, FaLightbulb, FaChartLine, FaComments, FaUser, FaCog, FaQuestionCircle, FaShieldAlt } from 'react-icons/fa';

const Sidebar = ({ darkMode, toggleDarkMode, currentPage, onPageChange }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: <FaChartLine /> },
    { id: 'schedule', name: 'Schedule Pickup', icon: <FaCalendarAlt /> },
    { id: 'opportunities', name: 'Opportunities', icon: <FaLightbulb /> },
    { id: 'messages', name: 'Messages', icon: <FaComments /> },
    { id: 'impact', name: 'My Impact', icon: <FaChartLine /> }
  ];

  const settingsItems = [
    { id: 'profile', name: 'My Profile', icon: <FaUser /> },
    { id: 'settings', name: 'Settings', icon: <FaCog /> },
    { id: 'help', name: 'Help & Support', icon: <FaQuestionCircle /> },
    { id: 'admin', name: 'Admin Panel', icon: <FaShieldAlt /> }
  ];

  return (
    <div className="sidebar">
      <div className="logo">
        <FaRecycle className="logo-icon" />
        <h2>WasteZero</h2>
      </div>
      
      <div className="user-info">
        <div className="avatar">A</div>
        <div className="user-details">
          <h3>Admin User</h3>
          <p>Admin</p>
        </div>
      </div>
      
      <div className="menu-section">
        <h4>MAIN MENU</h4>
        <ul className="menu-items">
          {menuItems.map(item => (
            <li 
              key={item.id}
              className={currentPage === item.id ? 'active' : ''}
              onClick={() => onPageChange(item.id)}
            >
              {item.icon} {item.name}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="menu-section">
        <h4>SETTINGS</h4>
        <ul className="menu-items">
          {settingsItems.map(item => (
            <li 
              key={item.id}
              className={currentPage === item.id ? 'active' : ''}
              onClick={() => onPageChange(item.id)}
            >
              {item.icon} {item.name}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="dark-mode-toggle">
        <span>Dark Mode</span>
        <label className="switch">
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
};

export default Sidebar;