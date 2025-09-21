import React, { useState } from 'react';
import './Header.css';
import { FaBell, FaSearch } from 'react-icons/fa';

const Header = () => {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div className="app-header">
      <div className="header-content">
        <div className="left-section">
          <div className="logo-container">
          </div>
          
          <div className={`search-container ${searchFocused ? 'focused' : ''}`}>
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search pickups, opportunities..." 
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>
        
        <div className="header-actions">
          <div className="notification-bell">
            <FaBell />
          </div>
          <div className="user-avatar">A</div>
        </div>
      </div>
    </div>
  );
};

export default Header; 