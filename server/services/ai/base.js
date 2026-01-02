/**
 * Base class for AI service providers
 * All AI integrations should extend this class
 */
class AIService {
  /**
   * Tailor a resume based on a job description
   * @param {Object} masterResume - The master resume object
   * @param {string} jobDescription - The job description text
   * @returns {Promise<Object>} - Tailored resume object
   */
  async tailorResume(masterResume, jobDescription) {
    throw new Error('tailorResume must be implemented by subclass');
  }

  /**
   * Get the prompt template for resume tailoring
   * @param {Object} masterResume - The master resume object
   * @param {string} jobDescription - The job description text
   * @returns {string} - The prompt to send to the AI
   */
  getPrompt(masterResume, jobDescription) {
    return `You are a professional resume writer. I will provide you with a master resume and a job description. Your task is to tailor the resume to the job posting by:

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
}

IMPORTANT: Return ONLY the JSON object, nothing else. Do not include markdown code blocks or explanations.`;
  }

  /**
   * Extract JSON from AI response (handles markdown wrapping)
   * @param {string} responseText - The AI response text
   * @returns {Object} - Parsed JSON object
   */
  extractJSON(responseText) {
    // Try to parse directly first
    try {
      return JSON.parse(responseText);
    } catch (e) {
      // If that fails, try to extract from markdown code blocks
      const jsonMatch = responseText.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/) ||
                       responseText.match(/\{[\s\S]*\}/);

      if (!jsonMatch) {
        throw new Error('Failed to extract JSON from AI response');
      }

      const jsonText = jsonMatch[1] || jsonMatch[0];
      return JSON.parse(jsonText);
    }
  }
}

module.exports = AIService;
