import React, { useState, useEffect } from 'react';
import './AdminPanel.css';
import Header from '../Header/Header';
import { 
  FaUsers, 
  FaCheckCircle, 
  FaClock, 
  FaLightbulb, 
  FaDownload, 
  FaSearch,
  FaUserShield,
  FaFileAlt,
  FaChartBar,
  FaCalendarAlt,
  FaEye,
  FaEdit,
  FaTrash,
  FaRecycle
} from 'react-icons/fa';

const AdminPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('users');
  const [animationClass, setAnimationClass] = useState('');

  // Mock data for demonstration
  const [stats, setStats] = useState({
    totalUsers: 0,
    completedPickups: 0,
    pendingPickups: 0,
    activeOpportunities: 0
  });

  const [users] = useState([
     ]);

  // Animate stats on component mount
  useEffect(() => {
    setAnimationClass('animate-in');
    
    // Animate numbers counting up
    const animateStats = () => {
      const targetStats = {
        totalUsers: 0,
        completedPickups: 0,
        pendingPickups: 0,
        activeOpportunities: 0
      };

      Object.keys(targetStats).forEach(key => {
        let current = 0;
        const target = targetStats[key];
        const increment = target / 50;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setStats(prev => ({ ...prev, [key]: Math.floor(current) }));
        }, 30);
      });
    };

    setTimeout(animateStats, 300);
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReportDownload = (reportType) => {
    // Simulate report generation
    const fileName = `${reportType}_report_${new Date().toISOString().split('T')[0]}.pdf`;
    console.log(`Downloading ${fileName}...`);
    // In a real app, this would trigger actual file download
    alert(`${reportType} report downloaded successfully!`);
  };

  const StatCard = ({ icon, title, value, color, delay }) => (
    <div className={`stat-card ${color} ${animationClass}`} style={{ animationDelay: `${delay}ms` }}>
      <div className="stat-icon">
        {icon}
      </div>
      <div className="stat-content">
        <h3>{value.toLocaleString()}</h3>
        <p>{title}</p>
      </div>
      <div className="stat-trend">
        <span className="trend-up">↗ +12%</span>
      </div>
    </div>
  );

  const ReportButton = ({ icon, title, description, onClick, delay }) => (
    <div className={`report-button ${animationClass}`} style={{ animationDelay: `${delay}ms` }} onClick={onClick}>
      <div className="report-icon">
        {icon}
      </div>
      <div className="report-content">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <FaDownload className="download-icon" />
    </div>
  );

  return (
    <div className="admin-panel">
      <Header />
      
      <div className="admin-content">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Manage platform users, monitor activity, and generate reports</p>
        </div>

        {/* Statistics Cards */}
        <div className="stats-grid">
        <StatCard
          icon={<FaUsers />}
          title="Total Users"
          value={stats.totalUsers}
          color="blue"
          delay={0}
        />
        <StatCard
          icon={<FaCheckCircle />}
          title="Completed Pickups"
          value={stats.completedPickups}
          color="green"
          delay={100}
        />
        <StatCard
          icon={<FaClock />}
          title="Pending Pickups"
          value={stats.pendingPickups}
          color="orange"
          delay={200}
        />
        <StatCard
          icon={<FaLightbulb />}
          title="Active Opportunities"
          value={stats.activeOpportunities}
          color="purple"
          delay={300}
        />
        </div>

        {/* Generate Reports Section */}
        <div className="admin-content">
        <div className="admin-header">
            <h2>Generate Reports</h2>
            <p>Download platform statistics and activity reports</p>
          </div>
          <div className="reports-grid">
            <ReportButton
              icon={<FaUsers />}
              title="Users Report"
              description="Download user statistics and activity reports"
              onClick={() => handleReportDownload('Users')}
              delay={500}
            />
            <ReportButton
              icon={<FaRecycle />}
              title="Pickups Report"
              description="Download pickup statistics and completion data"
              onClick={() => handleReportDownload('Pickups')}
              delay={600}
            />
            <ReportButton
              icon={<FaLightbulb />}
              title="Opportunities Report"
              description="Download opportunities and engagement metrics"
              onClick={() => handleReportDownload('Opportunities')}
              delay={700}
            />
            <ReportButton
              icon={<FaChartBar />}
              title="Full Activity Report"
              description="Comprehensive platform activity and performance"
              onClick={() => handleReportDownload('Full Activity')}
              delay={800}
            />
          </div>
        </div>

        {/* Users Management Section */}
        <div className="admin-content">
        <div className="admin-header">
            <h2>Users</h2>
            <p>Manage user accounts and permissions</p>
          </div>
          
          <div className="users-controls">
            <div className="tab-controls">
              <button 
                className={`tab-button ${selectedTab === 'users' ? 'active' : ''}`}
                onClick={() => setSelectedTab('users')}
              >
                Manage Users
              </button>
              <button 
                className={`tab-button ${selectedTab === 'logs' ? 'active' : ''}`}
                onClick={() => setSelectedTab('logs')}
              >
                Admin Logs
              </button>
            </div>
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="users-search"
              />
            </div>
          </div>

          {selectedTab === 'users' && (
            <div className="empty-state">
              <div className="empty-state-content">
                <h3>No users found</h3>
                <p>There are currently no users in the system</p>
                <button className="empty-state-button">Add First User</button>
              </div>
            </div>
          )}

          {selectedTab === 'logs' && (
            <div className="empty-state">
              <div className="empty-state-content">
                <h3>No admin logs available</h3>
                <p>Admin activity logs will appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
