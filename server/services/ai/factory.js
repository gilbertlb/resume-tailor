const ClaudeService = require('./claude');
const OllamaService = require('./ollama');
const OpenAIService = require('./openai');

/**
 * Factory to create the appropriate AI service based on configuration
 */
function createAIService() {
  const provider = process.env.AI_PROVIDER || 'ollama';

  switch (provider.toLowerCase()) {
    case 'claude':
      console.log('Using Claude AI service');
      return new ClaudeService();

    case 'openai':
      console.log('Using OpenAI service');
      return new OpenAIService();

    case 'ollama':
      console.log('Using Ollama service');
      return new OllamaService();

    default:
      throw new Error(
        `Unknown AI provider: ${provider}. Supported providers: claude, openai, ollama`
      );
  }
}

module.exports = { createAIService };
