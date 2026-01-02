const AIService = require('./base');

/**
 * Ollama AI Service
 * Uses local Ollama instance for resume tailoring
 */
class OllamaService extends AIService {
  constructor() {
    super();
    this.baseURL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
    this.model = process.env.OLLAMA_MODEL || 'llama3.1';
  }

  async tailorResume(masterResume, jobDescription) {
    const prompt = this.getPrompt(masterResume, jobDescription);

    try {
      const response = await fetch(`${this.baseURL}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          prompt: prompt,
          stream: false,
          options: {
            temperature: 0.7,
            num_predict: 4096,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ollama API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const responseText = data.response;

      // Extract and parse JSON from response
      return this.extractJSON(responseText);
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new Error(
          'Could not connect to Ollama. Make sure Ollama is running (ollama serve) and the model is installed.'
        );
      }
      throw error;
    }
  }
}

module.exports = OllamaService;
