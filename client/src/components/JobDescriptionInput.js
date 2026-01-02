import React from 'react';
import './JobDescriptionInput.css';

function JobDescriptionInput({ value, onChange, onGenerate, loading }) {
  return (
    <div className="job-description-input">
      <div className="section-header">
        <h2>Job Description</h2>
      </div>

      <div className="input-content">
        <p className="instruction">
          Paste the job description below. Claude will analyze it and tailor your resume to highlight the most relevant experience and skills.
        </p>

        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste the job description here..."
          rows="20"
          className="job-textarea"
        />

        <button
          onClick={onGenerate}
          disabled={loading || !value.trim()}
          className="btn btn-success"
        >
          {loading ? 'Generating Resume...' : 'Generate Tailored Resume'}
        </button>

        {loading && (
          <div className="loading-info">
            <div className="spinner"></div>
            <p>Claude is analyzing the job description and tailoring your resume. This may take 10-30 seconds...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobDescriptionInput;
