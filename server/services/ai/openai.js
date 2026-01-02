const AIService = require('./base');

/**
 * OpenAI AI Service
 * Uses OpenAI's GPT models for resume tailoring
 */
class OpenAIService extends AIService {
  constructor() {
    super();
    this.apiKey = process.env.OPENAI_API_KEY;
    this.model = process.env.OPENAI_MODEL || 'gpt-4';
    this.baseURL = 'https://api.openai.com/v1/chat/completions';
  }

  async tailorResume(masterResume, jobDescription) {
    const prompt = this.getPrompt(masterResume, jobDescription);

    const response = await fetch(this.baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const responseText = data.choices[0].message.content;

    // Extract and parse JSON from response
    return this.extractJSON(responseText);
  }
}

module.exports = OpenAIService;
