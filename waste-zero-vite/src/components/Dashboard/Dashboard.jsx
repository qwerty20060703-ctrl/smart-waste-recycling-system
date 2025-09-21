import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import StatsCard from '../Stats/StatsCard';
import Header from '../Header/Header';
import { FaCalendarAlt, FaRecycle, FaLeaf, FaClock, FaNewspaper, FaWineBottle, FaLaptop } from 'react-icons/fa';

const Dashboard = () => {
  const [animatedData, setAnimatedData] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);

  // Sample data for statistics
  const stats = [
    { title: 'Total Pickups', value: '20', change: '+7.2%', icon: <FaCalendarAlt />, color: '#2196F3' },
    { title: 'Recycled Items', value: '50', change: '+2.8%', icon: <FaRecycle />, color: '#4CAF50' },
    { title: 'CO2 Saved (kg)', value: '150', change: '+16.7%', icon: <FaLeaf />, color: '#FFC107' },
    { title: 'Volunteer Hours', value: '30', change: '+3.1%', icon: <FaClock />, color: '#9C27B0' }
  ];

  // Sample data for recycling breakdown
  const recyclingData = [
    { category: 'Plastic', percentage: 50 },
    { category: 'Paper', percentage: 20 },
    { category: 'Glass', percentage: 10 },
    { category: 'E-Waste', percentage: 10 },
    { category: 'Organic', percentage: 10 }
  ];

  useEffect(() => {
    // Animate the progress bars on mount
    const timer = setTimeout(() => {
      setAnimatedData(recyclingData);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const getIconForCategory = (category) => {
    switch(category) {
      case 'Plastic':
        return <FaRecycle />;
      case 'Paper':
        return <FaNewspaper />;
      case 'Glass':
        return <FaWineBottle />;
      case 'E-Waste':
        return <FaLaptop />;
      case 'Organic':
        return <FaLeaf />;
      default:
        return <FaRecycle />;
    }
  };

  const getColorForCategory = (category) => {
    switch(category) {
      case 'Plastic':
        return '#2196F3';
      case 'Paper':
        return '#FFC107';
      case 'Glass':
        return '#4CAF50';
      case 'E-Waste':
        return '#F44336';
      case 'Organic':
        return '#4CAF50';
      default:
        return '#9C27B0';
    }
  };

  return (
    <div className="dashboard">
      <div className="header-wrapper">
        <Header />
      </div>
      
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Welcome back, Admin User! Here's your waste management overview.</p>
        </div>

        <div className="stats-container">
          {stats.map((stat, index) => (
            <StatsCard 
              key={index}
              index={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </div>

        <div className="dashboard-sections">
          <div className="upcoming-pickups">
            <div className="section-header">
              <h2>Upcoming Pickups</h2>
              <button className="view-all">View All</button>
            </div>
            <table className="pickups-table">
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="4" className="no-pickups">No upcoming pickups scheduled.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="recycling-breakdown-section">
            <div className="section-header">
              <h2>Recycling Breakdown</h2>
              <span className="period">This Month</span>
            </div>
            <div className="recycling-breakdown">
              <div className="breakdown-grid">
                {recyclingData.map((item, index) => {
                  const animatedPercentage = animatedData.find(d => d.category === item.category)?.percentage || 0;
                  return (
                    <div 
                      key={index} 
                      className={`recycling-card ${hoveredItem === index ? 'hovered' : ''}`}
                      onMouseEnter={() => setHoveredItem(index)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <div className="card-header">
                        <div className="category-icon" style={{ color: getColorForCategory(item.category) }}>
                          {getIconForCategory(item.category)}
                        </div>
                        <div className="category-info">
                          <h4 className="category-name">{item.category}</h4>
                          <span className="category-percentage">{item.percentage}%</span>
                        </div>
                      </div>
                      
                      <div className="circular-progress">
                        <svg className="progress-ring" width="60" height="60">
                          <circle
                            className="progress-ring-background"
                            stroke="#f0f0f0"
                            strokeWidth="4"
                            fill="transparent"
                            r="26"
                            cx="30"
                            cy="30"
                          />
                          <circle
                            className="progress-ring-progress"
                            stroke={getColorForCategory(item.category)}
                            strokeWidth="4"
                            fill="transparent"
                            r="26"
                            cx="30"
                            cy="30"
                            style={{
                              strokeDasharray: `${2 * Math.PI * 26}`,
                              strokeDashoffset: `${2 * Math.PI * 26 * (1 - animatedPercentage / 100)}`,
                              transition: 'stroke-dashoffset 1.5s ease-in-out'
                            }}
                          />
                        </svg>
                        <div className="progress-text">
                          <span className="progress-value">{item.percentage}</span>
                          <span className="progress-unit">%</span>
                        </div>
                      </div>
                      
                      <div className="card-footer">
                        <div className="weight-info">
                          <span className="weight-value">{(item.percentage * 1.245).toFixed(1)} kg</span>
                          <span className="weight-label">This month</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="total-collected">
              <div>
                <h3>Total Collected</h3>
                <p className="total-value">125.7 kg</p>
              </div>
              <span className="total-change">+10.2%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;