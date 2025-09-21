import React, { useState, useEffect } from 'react';
import './StatsCard.css';

const StatsCard = ({ title, value, change, icon, color, index }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const isPositive = change && change.startsWith('+');
  
  useEffect(() => {
    const numericValue = parseInt(value.replace(/[^\d]/g, ''));
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = numericValue / steps;
    let currentValue = 0;
    
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        currentValue += increment;
        if (currentValue >= numericValue) {
          setAnimatedValue(numericValue);
          clearInterval(interval);
        } else {
          setAnimatedValue(Math.floor(currentValue));
        }
      }, duration / steps);
      
      return () => clearInterval(interval);
    }, index * 200); // Stagger animation based on card index
    
    return () => clearTimeout(timer);
  }, [value, index]);
  
  const formatValue = (val) => {
    if (title.includes('CO2')) {
      return val;
    }
    return val;
  };
  
  return (
    <div 
      className={`stats-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="stats-card-header">
        <div className="stats-icon-container">
          <div className="stats-icon" style={{ backgroundColor: color }}>
            {icon}
          </div>
          <div className="icon-glow" style={{ backgroundColor: color }}></div>
        </div>
        <div className="stats-change" style={{ color: isPositive ? '#4CAF50' : '#f44336' }}>
          <span className="change-indicator">{isPositive ? '↗' : '↘'}</span>
          {change}
        </div>
      </div>
      
      <div className="stats-content">
        <div className="stats-main-display">
          <div className="number-display">
            <span className="main-number">{formatValue(animatedValue)}</span>
            <span className="number-label">{title}</span>
          </div>
          <div className="value-underline" style={{ backgroundColor: color }}></div>
        </div>
      </div>
      
      <div className="stats-progress-bar">
        <div 
          className="progress-fill" 
          style={{ 
            backgroundColor: color,
            width: `${(animatedValue / parseInt(value.replace(/[^\d]/g, ''))) * 100}%`
          }}
        ></div>
      </div>
    </div>
  );
};

export default StatsCard;
