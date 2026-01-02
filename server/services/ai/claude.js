const AIService = require('./base');
const Anthropic = require('@anthropic-ai/sdk');

/**
 * Claude AI Service
 * Uses Anthropic's Claude API for resume tailoring
 */
class ClaudeService extends AIService {
  constructor() {
    super();
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
    this.model = process.env.CLAUDE_MODEL || 'claude-sonnet-4-5-20250929';
  }

  async tailorResume(masterResume, jobDescription) {
    const prompt = this.getPrompt(masterResume, jobDescription);

    const message = await this.client.messages.create({
      model: this.model,
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const responseText = message.content[0].text;

    // Extract and parse JSON from response
    return this.extractJSON(responseText);
  }
}

module.exports = ClaudeService;
