import React, { useState } from 'react';
import './SchedulePickup.css';
import Header from '../Header/Header';

const SchedulePickup = () => {
  const [activeTab, setActiveTab] = useState('schedule');
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    pickupDate: '',
    timeSlot: '',
    wasteTypes: [],
    additionalNotes: ''
  });

  const wasteTypeOptions = [
    { id: 'plastic', label: 'Plastic', icon: '♻️' },
    { id: 'glass', label: 'Glass', icon: '🥛' },
    { id: 'electronic', label: 'Electronic Waste', icon: '📱' },
    { id: 'paper', label: 'Paper', icon: '📄' },
    { id: 'metal', label: 'Metal', icon: '🔧' },
    { id: 'organic', label: 'Organic Waste', icon: '🍃' },
    { id: 'other', label: 'Other', icon: '📦' }
  ];

  const timeSlots = [
    '8:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM',
    '12:00 PM - 2:00 PM',
    '2:00 PM - 4:00 PM',
    '4:00 PM - 6:00 PM'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleWasteTypeChange = (wasteType) => {
    setFormData(prev => ({
      ...prev,
      wasteTypes: prev.wasteTypes.includes(wasteType)
        ? prev.wasteTypes.filter(type => type !== wasteType)
        : [...prev.wasteTypes, wasteType]
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSchedulePickup = () => {
    console.log('Scheduling pickup with data:', formData);
    alert('Pickup scheduled successfully!');
    setCurrentStep(1);
    setFormData({
      address: '',
      city: '',
      pickupDate: '',
      timeSlot: '',
      wasteTypes: [],
      additionalNotes: ''
    });
  };

  // Step 1
  const stepOneForm = (
    <div className="form-step">
      <div className="step-header">
        <h2>Request Waste Collection</h2>
        <p>Fill in the details to schedule a pickup for your recyclable waste</p>
      </div>
      <div className="form-grid">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              placeholder="Enter your street address"
              value={formData.address}
              onChange={e => handleInputChange('address', e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              placeholder="Enter your city"
              value={formData.city}
              onChange={e => handleInputChange('city', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pickupDate">Pickup Date</label>
            <input
              id="pickupDate"
              type="date"
              placeholder="dd-mm-yyyy"
              value={formData.pickupDate}
              onChange={e => handleInputChange('pickupDate', e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group" style={{ gridColumn: '1 / span 2' }}>
            <label htmlFor="timeSlot">Preferred Time Slot</label>
            <select
              id="timeSlot"
              value={formData.timeSlot}
              onChange={e => handleInputChange('timeSlot', e.target.value)}
            >
              <option value="">Select a time slot</option>
              {timeSlots.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="form-actions">
        <button className="btn btn-primary" onClick={handleNextStep}>
          Next Step
        </button>
      </div>
    </div>
  );

  // Step 2
  const stepTwoForm = (
    <div className="form-step">
      <div className="step-header">
        <h2>Request Waste Collection</h2>
        <p>Select the types of waste and add details for your pickup</p>
      </div>
      <div className="waste-types-section">
        <h3>Waste Types</h3>
        <p>Select the types of waste you want to recycle</p>
        <div className="waste-types-grid">
          {wasteTypeOptions.map(option => (
            <div key={option.id} className="waste-type-item">
              <input
                type="checkbox"
                id={option.id}
                checked={formData.wasteTypes.includes(option.label)}
                onChange={() => handleWasteTypeChange(option.label)}
              />
              <label htmlFor={option.id}>
                <span className="waste-icon">{option.icon}</span>
                <span className="waste-label">{option.label}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="notes">Additional Notes</label>
        <textarea
          id="notes"
          placeholder="Any special instructions or information about your waste"
          value={formData.additionalNotes}
          onChange={e => handleInputChange('additionalNotes', e.target.value)}
        />
        <small>
          Please provide any additional details that might help our pickup team.
        </small>
      </div>
      <div className="form-actions">
        <button className="btn btn-secondary" onClick={handlePreviousStep}>
          Previous Step
        </button>
        <button className="btn btn-primary" onClick={handleSchedulePickup}>
          Schedule Pickup
        </button>
      </div>
    </div>
  );

  // Tab Content
  const tabContent = (
    <div className="tab-content">
      {currentStep === 1 ? stepOneForm : stepTwoForm}
    </div>
  );

  return (
    <div className="schedule-pickup-outer">
      <Header />
      <div className="schedule-pickup-inner">
        <div className="schedule-container">
          <div className="page-header">
            <h1>Schedule Pickup</h1>
            <p>Request waste collection and manage your pickups</p>
          </div>
          <div className="tab-navigation">
            <button
              className={`tab-btn${activeTab === 'schedule' ? ' active' : ''}`}
              onClick={() => setActiveTab('schedule')}
            >
              Schedule New Pickup
            </button>
            <button
              className={`tab-btn${activeTab === 'history' ? ' active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              Pickup History
            </button>
          </div>
          {activeTab === 'schedule' ? tabContent : (
            <div className="tab-content">
              <div className="pickup-history">
                <div className="history-header">
                  <h2>Your Pickup History</h2>
                  <p>View and manage all your scheduled pickups</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchedulePickup;
