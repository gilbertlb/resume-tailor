const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export async function getMasterResume() {
  const response = await fetch(`${API_BASE}/api/master-resume`);
  if (!response.ok) {
    throw new Error('Failed to fetch master resume');
  }
  return response.json();
}

export async function saveMasterResume(resume) {
  const response = await fetch(`${API_BASE}/api/master-resume`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(resume),
  });
  if (!response.ok) {
    throw new Error('Failed to save master resume');
  }
  return response.json();
}

export async function generateTailoredResume(masterResume, jobDescription) {
  const response = await fetch(`${API_BASE}/api/tailor/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      masterResume,
      jobDescription,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to generate tailored resume');
  }

  return response.blob();
}
