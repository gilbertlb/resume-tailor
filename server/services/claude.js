const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function tailorResume(masterResume, jobDescription) {
  const prompt = `You are a professional resume writer. I will provide you with a master resume and a job description. Your task is to tailor the resume to the job posting by:

1. Rewriting the professional summary to highlight relevant experience for this specific role
2. Reordering and rephrasing experience bullet points to emphasize skills mentioned in the job description
3. Highlighting relevant skills that match the job requirements
4. Keeping all information truthful - only rephrase and reorder, don't add fake experience

Master Resume:
${JSON.stringify(masterResume, null, 2)}

Job Description:
${jobDescription}

Please return a JSON object with the same structure as the master resume, but tailored for this job. Make sure the JSON is valid and follows this exact structure:
{
  "contactInfo": { "name": "...", "email": "...", "phone": "...", "location": "...", "linkedin": "...", "github": "..." },
  "summary": "...",
  "experience": [{ "company": "...", "position": "...", "location": "...", "startDate": "...", "endDate": "...", "bullets": ["..."] }],
  "education": [{ "institution": "...", "degree": "...", "field": "...", "graduationDate": "...", "gpa": "..." }],
  "skills": { "technical": ["..."], "soft": ["..."] },
  "projects": [{ "name": "...", "description": "...", "technologies": ["..."], "bullets": ["..."] }]
}`;

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const responseText = message.content[0].text;

  // Extract JSON from the response (in case Claude wraps it in markdown)
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to extract JSON from Claude response');
  }

  return JSON.parse(jsonMatch[0]);
}

module.exports = { tailorResume };
