import React from "react";

const ComplaintIssue = () => {
  return (
    <div className="phone-container">
      <div className="header">
        <div className="header-content">
          <div className="back-btn">←</div>
          <div className="header-title">
            <div className="page-title">Maintenance Request</div>
            <div className="page-subtitle">
              Report issues and track progress
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="form-section">
          <div className="section-title">🛠️ New Request</div>

          <div className="form-group">
            <label className="form-label">Issue Type</label>
            <div className="dropdown-container">
              <div className="dropdown-icon" id="dropdownIcon">
                📝
              </div>
              <select className="dropdown" id="issueType">
                <option value="">Select issue type</option>
                <option value="water" data-icon="💧">
                  Water Issue
                </option>
                <option value="electricity" data-icon="⚡">
                  Electricity Problem
                </option>
                <option value="lift" data-icon="🛗">
                  Lift/Elevator
                </option>
                <option value="others" data-icon="🔧">
                  Others
                </option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <div className="textarea-container">
              <textarea
                className="textarea"
                id="description"
                placeholder="Please describe the issue in detail. Include location, severity, and any relevant information..."
                maxLength={500}
              ></textarea>
              <div className="char-count" id="charCount">
                0/500
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Upload Photo (Optional)</label>
            <div className="upload-section" id="uploadSection">
              <div className="upload-icon">📷</div>
              <div className="upload-text">Upload Photo</div>
              <div className="upload-subtext">
                Tap to add image or drag and drop
              </div>
              <input
                type="file"
                className="file-input"
                id="fileInput"
                accept="image/*"
              />
            </div>
          </div>

          <button className="submit-btn" id="submitBtn" disabled>
            Submit Request
          </button>
        </div>

        <div className="status-section">
          <div className="section-title">📊 Current Request Status</div>
          <div className="timeline">
            <div className="timeline-item completed">
              <div className="timeline-dot">✓</div>
              <div className="timeline-content">
                <div className="timeline-title">Request Submitted</div>
                <div className="timeline-description">
                  Your maintenance request has been received
                </div>
                <div className="timeline-time">2 hours ago</div>
              </div>
            </div>
            <div className="timeline-item active">
              <div className="timeline-dot">⏳</div>
              <div className="timeline-content">
                <div className="timeline-title">In Progress</div>
                <div className="timeline-description">
                  Maintenance team has been assigned and working on it
                </div>
                <div className="timeline-time">Started 1 hour ago</div>
              </div>
            </div>
            <div className="timeline-item pending">
              <div className="timeline-dot">⭕</div>
              <div className="timeline-content">
                <div className="timeline-title">Resolved</div>
                <div className="timeline-description">
                  Issue will be marked as completed
                </div>
                <div className="timeline-time">Estimated completion</div>
              </div>
            </div>
          </div>
        </div>

        <div className="section-title">📋 Previous Requests</div>
        <div className="previous-requests">
          <div className="request-item">
            <div className="request-header">
              <div className="request-type">⚡ Electricity Problem</div>
              <div className="request-date">Dec 25</div>
            </div>
            <div className="request-description">
              Power outage in bedroom, no electricity for 2 days
            </div>
            <span className="request-status status-resolved">Resolved</span>
          </div>

          <div className="request-item">
            <div className="request-header">
              <div className="request-type">🛗 Lift Issue</div>
              <div className="request-date">Dec 20</div>
            </div>
            <div className="request-description">
              Elevator making strange noises and stopping between floors
            </div>
            <span className="request-status status-resolved">Resolved</span>
          </div>

          <div className="request-item">
            <div className="request-header">
              <div className="request-type">💧 Water Leakage</div>
              <div className="request-date">Dec 15</div>
            </div>
            <div className="request-description">
              Kitchen tap leaking continuously, water wastage
            </div>
            <span className="request-status status-resolved">Resolved</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintIssue;
