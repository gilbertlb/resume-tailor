import React, { useState } from 'react';
import './ResumeEditor.css';

function ResumeEditor({ resume, onSave }) {
  const [editedResume, setEditedResume] = useState(resume);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (path, value) => {
    const keys = path.split('.');
    const newResume = JSON.parse(JSON.stringify(editedResume));

    let current = newResume;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;

    setEditedResume(newResume);
    setIsEditing(true);
  };

  const handleArrayChange = (path, index, value) => {
    const keys = path.split('.');
    const newResume = JSON.parse(JSON.stringify(editedResume));

    let current = newResume;
    for (let i = 0; i < keys.length; i++) {
      if (i === keys.length - 1) {
        current[keys[i]][index] = value;
      } else {
        current = current[keys[i]];
      }
    }

    setEditedResume(newResume);
    setIsEditing(true);
  };

  const handleSave = () => {
    onSave(editedResume);
    setIsEditing(false);
  };

  const handleReset = () => {
    setEditedResume(resume);
    setIsEditing(false);
  };

  return (
    <div className="resume-editor">
      <div className="section-header">
        <h2>Master Resume</h2>
        <div className="button-group">
          {isEditing && (
            <>
              <button onClick={handleReset} className="btn btn-secondary">
                Reset
              </button>
              <button onClick={handleSave} className="btn btn-primary">
                Save Changes
              </button>
            </>
          )}
        </div>
      </div>

      <div className="editor-content">
        <section className="editor-section">
          <h3>Contact Information</h3>
          <input
            type="text"
            value={editedResume.contactInfo.name}
            onChange={(e) => handleChange('contactInfo.name', e.target.value)}
            placeholder="Full Name"
          />
          <input
            type="email"
            value={editedResume.contactInfo.email}
            onChange={(e) => handleChange('contactInfo.email', e.target.value)}
            placeholder="Email"
          />
          <input
            type="tel"
            value={editedResume.contactInfo.phone}
            onChange={(e) => handleChange('contactInfo.phone', e.target.value)}
            placeholder="Phone"
          />
          <input
            type="text"
            value={editedResume.contactInfo.location}
            onChange={(e) => handleChange('contactInfo.location', e.target.value)}
            placeholder="Location"
          />
          <input
            type="text"
            value={editedResume.contactInfo.linkedin || ''}
            onChange={(e) => handleChange('contactInfo.linkedin', e.target.value)}
            placeholder="LinkedIn URL"
          />
          <input
            type="text"
            value={editedResume.contactInfo.github || ''}
            onChange={(e) => handleChange('contactInfo.github', e.target.value)}
            placeholder="GitHub URL"
          />
        </section>

        <section className="editor-section">
          <h3>Professional Summary</h3>
          <textarea
            value={editedResume.summary}
            onChange={(e) => handleChange('summary', e.target.value)}
            placeholder="Write a brief professional summary..."
            rows="4"
          />
        </section>

        <section className="editor-section">
          <h3>Experience</h3>
          {editedResume.experience.map((exp, idx) => (
            <div key={idx} className="experience-item">
              <h4>Position {idx + 1}</h4>
              <input
                type="text"
                value={exp.position}
                onChange={(e) => handleArrayChange('experience', idx, { ...exp, position: e.target.value })}
                placeholder="Position Title"
              />
              <input
                type="text"
                value={exp.company}
                onChange={(e) => handleArrayChange('experience', idx, { ...exp, company: e.target.value })}
                placeholder="Company Name"
              />
              <div className="row">
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => handleArrayChange('experience', idx, { ...exp, location: e.target.value })}
                  placeholder="Location"
                />
                <input
                  type="text"
                  value={exp.startDate}
                  onChange={(e) => handleArrayChange('experience', idx, { ...exp, startDate: e.target.value })}
                  placeholder="Start Date"
                />
                <input
                  type="text"
                  value={exp.endDate}
                  onChange={(e) => handleArrayChange('experience', idx, { ...exp, endDate: e.target.value })}
                  placeholder="End Date"
                />
              </div>
              <div className="bullets">
                {exp.bullets.map((bullet, bIdx) => (
                  <textarea
                    key={bIdx}
                    value={bullet}
                    onChange={(e) => {
                      const newBullets = [...exp.bullets];
                      newBullets[bIdx] = e.target.value;
                      handleArrayChange('experience', idx, { ...exp, bullets: newBullets });
                    }}
                    placeholder={`Bullet point ${bIdx + 1}`}
                    rows="2"
                  />
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="editor-section">
          <h3>Education</h3>
          {editedResume.education.map((edu, idx) => (
            <div key={idx} className="education-item">
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => handleArrayChange('education', idx, { ...edu, institution: e.target.value })}
                placeholder="Institution"
              />
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleArrayChange('education', idx, { ...edu, degree: e.target.value })}
                placeholder="Degree"
              />
              <div className="row">
                <input
                  type="text"
                  value={edu.field}
                  onChange={(e) => handleArrayChange('education', idx, { ...edu, field: e.target.value })}
                  placeholder="Field of Study"
                />
                <input
                  type="text"
                  value={edu.graduationDate}
                  onChange={(e) => handleArrayChange('education', idx, { ...edu, graduationDate: e.target.value })}
                  placeholder="Graduation Date"
                />
                <input
                  type="text"
                  value={edu.gpa || ''}
                  onChange={(e) => handleArrayChange('education', idx, { ...edu, gpa: e.target.value })}
                  placeholder="GPA (optional)"
                />
              </div>
            </div>
          ))}
        </section>

        <section className="editor-section">
          <h3>Skills</h3>
          <label>Technical Skills (comma-separated)</label>
          <textarea
            value={editedResume.skills.technical.join(', ')}
            onChange={(e) => handleChange('skills.technical', e.target.value.split(',').map(s => s.trim()))}
            placeholder="JavaScript, Python, React, etc."
            rows="3"
          />
          <label>Soft Skills (comma-separated)</label>
          <textarea
            value={editedResume.skills.soft.join(', ')}
            onChange={(e) => handleChange('skills.soft', e.target.value.split(',').map(s => s.trim()))}
            placeholder="Leadership, Communication, etc."
            rows="2"
          />
        </section>
      </div>
    </div>
  );
}

export default ResumeEditor;
