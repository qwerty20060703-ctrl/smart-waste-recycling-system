import React, { useState } from 'react';
import Header from '../Header/Header';
import './Opportunities.css';
import { FaSearch, FaFilter, FaPlus, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUsers } from 'react-icons/fa';

const Opportunities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  const opportunities = [
    {
      id: 1,
      title: "Beach Cleanup Drive",
      description: "Join us for a day of cleaning the shoreline and protecting marine life",
      status: "Open",
      date: "2025-06-30",
      location: "Brighton Beach, Boston",
      duration: "4 hours",
      participants: "15 volunteers needed",
      image: "/images/Beach Cleanup Drive.jpg.jpg",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      id: 2,
      title: "Recycling Workshop",
      description: "Teach community members about proper recycling techniques",
      status: "Open",
      date: "2025-06-15",
      location: "Community Center, Seattle",
      duration: "2 hours",
      participants: "8 volunteers needed",
      image: "/images/Recycling Workshop.jpg.jpg",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      id: 3,
      title: "School Education Program",
      description: "Visit local schools to raise awareness about waste management",
      status: "Open",
      date: "2025-07-10",
      location: "Various schools in Boston",
      duration: "3 hours per session",
      participants: "12 volunteers needed",
      image: "/images/School Education Program.jpg.jpg",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
      id: 4,
      title: "Community Garden Project",
      description: "Help establish composting systems in local community gardens",
      status: "Open",
      date: "2025-06-20",
      location: "Green Valley Gardens, Portland",
      duration: "5 hours",
      participants: "20 volunteers needed",
      image: "/images/Community Garden Project.jpg.jpg",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    },
    {
      id: 5,
      title: "E-Waste Collection Drive",
      description: "Organize collection and proper disposal of electronic waste",
      status: "Open",
      date: "2025-07-05",
      location: "Tech Hub, San Francisco",
      duration: "6 hours",
      participants: "10 volunteers needed",
      image: "/images/E-Waste Collection Drive.jpg.jpg",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
    },
    {
      id: 6,
      title: "River Cleanup Initiative",
      description: "Clean waterways and remove plastic pollution from rivers",
      status: "Open",
      date: "2025-06-25",
      location: "Charles River, Cambridge",
      duration: "4 hours",
      participants: "25 volunteers needed",
      image: "/images/River Cleanup Initiative.jpg.jpg",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
    }
  ];

  const filteredOpportunities = opportunities.filter(opportunity =>
    opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opportunity.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <Header />
      <div className="opportunities-container">
        {/* Header Section */}
        <div className="opportunities-header">
          <div>
            <h1 className="opportunities-title">Volunteer Opportunities</h1>
            <p className="opportunities-subtitle">Browse and join recycling and waste management initiatives</p>
          </div>
          <button className="create-opportunity-btn">
            <FaPlus />
            Create Opportunity
          </button>
        </div>

        {/* Controls Section */}
        <div className="opportunities-controls">
          <div className="search-filter-container">
            <div className="opportunities-search">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="status-filter">
            <FaFilter />
            <span>{statusFilter}</span>
          </div>
        </div>

        {/* Opportunities Grid */}
        <div className="opportunities-grid">
          {filteredOpportunities.map((opportunity) => (
            <div key={opportunity.id} className="opportunity-card">
              <img 
                src={opportunity.image}
                alt={opportunity.title}
                className="opportunity-image"
              />
              <div className="opportunity-content">
                <span className="opportunity-status">{opportunity.status}</span>
                <h3 className="opportunity-title">{opportunity.title}</h3>
                <p className="opportunity-description">{opportunity.description}</p>
                
                <div className="opportunity-details">
                  <div className="opportunity-detail">
                    <FaCalendarAlt className="opportunity-detail-icon" />
                    <span>{opportunity.date}</span>
                  </div>
                  <div className="opportunity-detail">
                    <FaMapMarkerAlt className="opportunity-detail-icon" />
                    <span>{opportunity.location}</span>
                  </div>
                  <div className="opportunity-detail">
                    <FaClock className="opportunity-detail-icon" />
                    <span>{opportunity.duration}</span>
                  </div>
                  <div className="opportunity-detail">
                    <FaUsers className="opportunity-detail-icon" />
                    <span>{opportunity.participants}</span>
                  </div>
                </div>
                
                <button className="view-details-btn">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Opportunities;