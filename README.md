# Resume Tailor

A web application that uses AI to tailor your resume to specific job postings. Keep your master resume safe while generating customized versions for each application.

## Features

- **Master Resume Management**: Store and edit your complete resume in a structured JSON format
- **AI-Powered Tailoring**: AI analyzes job descriptions and customizes your resume to highlight relevant experience
- **Multiple AI Providers**: Support for Ollama (local/free), Claude API, and OpenAI - easily switch between them
- **PDF Export**: Generate professional PDF resumes ready to submit
- **Preservation**: Your master resume is never modified - only tailored copies are created

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js + Express
- **AI**: Pluggable architecture supporting:
  - **Ollama** (local, free, recommended for getting started)
  - **Claude API** (Anthropic)
  - **OpenAI API** (GPT-4)
- **PDF Generation**: PDFKit

## Prerequisites

- Node.js 16+ and npm
- **One of the following AI providers**:
  - **Ollama** (Recommended for local/free usage) - [Install Ollama](https://ollama.ai/)
  - **Claude API** key - [Get one here](https://console.anthropic.com/)
  - **OpenAI API** key - [Get one here](https://platform.openai.com/)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd resume-tailor
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up your AI provider**

   ### Option A: Ollama (Recommended - Free & Local)

   1. Install Ollama from [ollama.ai](https://ollama.ai/)
   2. Pull a model (recommended: llama3.1):
      ```bash
      ollama pull llama3.1
      ```
   3. Start Ollama (if not already running):
      ```bash
      ollama serve
      ```

   ### Option B: Claude API

   1. Sign up at [console.anthropic.com](https://console.anthropic.com/)
   2. Get your API key from the dashboard

   ### Option C: OpenAI API

   1. Sign up at [platform.openai.com](https://platform.openai.com/)
   2. Get your API key from the dashboard

4. **Configure environment variables**
   ```bash
   cd server
   cp .env.example .env
   ```

   Edit `server/.env` and set your AI provider:

   **For Ollama (default):**
   ```env
   AI_PROVIDER=ollama
   OLLAMA_BASE_URL=http://localhost:11434
   OLLAMA_MODEL=llama3.1
   ```

   **For Claude:**
   ```env
   AI_PROVIDER=claude
   ANTHROPIC_API_KEY=your_api_key_here
   CLAUDE_MODEL=claude-sonnet-4-5-20250929
   ```

   **For OpenAI:**
   ```env
   AI_PROVIDER=openai
   OPENAI_API_KEY=your_api_key_here
   OPENAI_MODEL=gpt-4
   ```

5. **Configure your master resume**

   Edit `data/master-resume.json` with your actual resume information. The template includes:
   - Contact information
   - Professional summary
   - Work experience
   - Education
   - Skills (technical and soft)
   - Projects

## Usage

### Development Mode

Run both frontend and backend in development mode:

```bash
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

### Production Mode

1. Build the frontend:
   ```bash
   cd client
   npm run build
   ```

2. Run the backend:
   ```bash
   cd server
   npm start
   ```

## How to Use

1. **Edit Your Master Resume**: Use the left panel to update your master resume information. Click "Save Changes" when done.

2. **Paste Job Description**: Copy the job posting text and paste it into the right panel.

3. **Generate Tailored Resume**: Click the "Generate Tailored Resume" button. The AI will:
   - Analyze the job requirements
   - Reorder and rephrase your experience to highlight relevant skills
   - Customize your professional summary
   - Emphasize matching skills

4. **Download PDF**: The tailored resume will automatically download as a PDF file.

## Switching AI Providers

You can easily switch between AI providers by changing the `AI_PROVIDER` in your `.env` file:

```env
AI_PROVIDER=ollama  # or claude, or openai
```

Restart the server after changing the provider.

### AI Provider Comparison

| Provider | Cost | Speed | Quality | Setup |
|----------|------|-------|---------|-------|
| **Ollama** | Free | Medium | Good | Easy (local install) |
| **Claude** | Paid API | Fast | Excellent | Easy (API key) |
| **OpenAI** | Paid API | Fast | Excellent | Easy (API key) |

**Recommendation**: Start with Ollama for free local testing. Upgrade to Claude or OpenAI for production use if you need higher quality results.

## Project Structure

```
resume-tailor/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/    # Resume editor, job input
│       ├── services/      # API calls
│       └── App.js
├── server/                # Express backend
│   ├── routes/           # API endpoints
│   ├── services/
│   │   ├── ai/          # AI provider implementations
│   │   └── pdf.js       # PDF generation
│   └── index.js
├── data/                 # Master resume storage
│   └── master-resume.json
└── README.md
```

## API Endpoints

- `GET /api/master-resume` - Fetch the master resume
- `POST /api/master-resume` - Update the master resume
- `POST /api/tailor/generate` - Generate a tailored resume PDF

## Customization

### PDF Styling

Edit `server/services/pdf.js` to customize:
- Fonts and font sizes
- Section headers and formatting
- Page margins and layout
- Color scheme

### Resume Structure

Modify `data/master-resume.json` structure to add/remove sections. Update the corresponding code in:
- `server/services/pdf.js` (PDF generation)
- `server/services/ai/base.js` (AI prompt template)
- `client/src/components/ResumeEditor.js` (UI editor)

### Adding New AI Providers

The application uses a pluggable architecture for AI providers:

1. Create a new file in `server/services/ai/` (e.g., `gemini.js`)
2. Extend the `AIService` base class
3. Implement the `tailorResume()` method
4. Add your provider to `server/services/ai/factory.js`
5. Update `.env.example` with configuration options

Example:
```javascript
const AIService = require('./base');

class MyAIService extends AIService {
  async tailorResume(masterResume, jobDescription) {
    const prompt = this.getPrompt(masterResume, jobDescription);
    // Call your AI API here
    // Use this.extractJSON() to parse the response
  }
}
```

## Tips for Best Results

1. **Complete Master Resume**: Fill in all sections thoroughly - AI can only work with what you provide
2. **Quantify Achievements**: Include numbers and metrics in your bullet points
3. **Detailed Job Descriptions**: Paste the complete job posting for better analysis
4. **Review Output**: Always review the generated resume before submitting
5. **Model Selection**: For Ollama, larger models (llama3.1, mixtral) produce better results than smaller ones

## Security Notes

- Never commit your `.env` file with your API key
- The master resume is stored locally in `data/master-resume.json`
- For production deployment, consider using a database and authentication

## Troubleshooting

**Issue**: "Could not connect to Ollama"
- Make sure Ollama is installed and running: `ollama serve`
- Verify the model is installed: `ollama list`
- If not installed, pull it: `ollama pull llama3.1`
- Check `OLLAMA_BASE_URL` in `.env` (default: `http://localhost:11434`)

**Issue**: "Failed to generate tailored resume"
- **For Ollama**: See above
- **For Claude**: Check that your API key is correct in `.env` and you have credits available
- **For OpenAI**: Check that your API key is correct in `.env` and you have credits available
- Check the server console for detailed error messages

**Issue**: PDF download not working
- Ensure both frontend and backend are running
- Check browser console for errors
- Verify the proxy setting in `client/package.json`

**Issue**: Low quality results with Ollama
- Try using a larger/better model: `ollama pull llama3.1` or `ollama pull mixtral`
- Update `OLLAMA_MODEL` in `.env` to match the model you pulled
- Consider upgrading to Claude or OpenAI for better quality

## License

MIT

## Contributing

Contributions welcome! Please open an issue or submit a pull request.
