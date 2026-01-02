import React, { useState, useEffect } from 'react';
import './App.css';
import ResumeEditor from './components/ResumeEditor';
import JobDescriptionInput from './components/JobDescriptionInput';
import { getMasterResume, saveMasterResume, generateTailoredResume } from './services/api';

function App() {
  const [masterResume, setMasterResume] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadMasterResume();
  }, []);

  const loadMasterResume = async () => {
    try {
      const resume = await getMasterResume();
      setMasterResume(resume);
    } catch (err) {
      setError('Failed to load master resume: ' + err.message);
    }
  };

  const handleSaveMasterResume = async (updatedResume) => {
    try {
      await saveMasterResume(updatedResume);
      setMasterResume(updatedResume);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to save master resume: ' + err.message);
    }
  };

  const handleGenerateTailoredResume = async () => {
    if (!jobDescription.trim()) {
      setError('Please enter a job description');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const blob = await generateTailoredResume(masterResume, jobDescription);

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'tailored-resume.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to generate tailored resume: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!masterResume) {
    return (
      <div className="App">
        <div className="loading">Loading master resume...</div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Resume Tailor</h1>
        <p>Customize your resume for any job posting using AI</p>
      </header>

      <div className="container">
        {error && (
          <div className="alert alert-error">
            {error}
            <button onClick={() => setError(null)}>×</button>
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            Success!
          </div>
        )}

        <div className="grid">
          <div className="grid-item">
            <ResumeEditor
              resume={masterResume}
              onSave={handleSaveMasterResume}
            />
          </div>

          <div className="grid-item">
            <JobDescriptionInput
              value={jobDescription}
              onChange={setJobDescription}
              onGenerate={handleGenerateTailoredResume}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
