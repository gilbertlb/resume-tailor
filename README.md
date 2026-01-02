# Resume Tailor

A web application that uses Claude AI to tailor your resume to specific job postings. Keep your master resume safe while generating customized versions for each application.

## Features

- **Master Resume Management**: Store and edit your complete resume in a structured JSON format
- **AI-Powered Tailoring**: Claude analyzes job descriptions and customizes your resume to highlight relevant experience
- **PDF Export**: Generate professional PDF resumes ready to submit
- **Preservation**: Your master resume is never modified - only tailored copies are created

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js + Express
- **AI**: Claude API (Anthropic)
- **PDF Generation**: PDFKit

## Prerequisites

- Node.js 16+ and npm
- Anthropic API key ([get one here](https://console.anthropic.com/))

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

3. **Set up environment variables**
   ```bash
   cd server
   cp .env.example .env
   ```

   Edit `server/.env` and add your Anthropic API key:
   ```
   ANTHROPIC_API_KEY=your_api_key_here
   PORT=3001
   ```

4. **Configure your master resume**

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

3. **Generate Tailored Resume**: Click the "Generate Tailored Resume" button. Claude will:
   - Analyze the job requirements
   - Reorder and rephrase your experience to highlight relevant skills
   - Customize your professional summary
   - Emphasize matching skills

4. **Download PDF**: The tailored resume will automatically download as a PDF file.

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
│   ├── services/         # Claude API, PDF generation
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
- `server/services/claude.js` (Claude prompt)
- `client/src/components/ResumeEditor.js` (UI editor)

## Tips for Best Results

1. **Complete Master Resume**: Fill in all sections thoroughly - Claude can only work with what you provide
2. **Quantify Achievements**: Include numbers and metrics in your bullet points
3. **Detailed Job Descriptions**: Paste the complete job posting for better analysis
4. **Review Output**: Always review the generated resume before submitting

## Security Notes

- Never commit your `.env` file with your API key
- The master resume is stored locally in `data/master-resume.json`
- For production deployment, consider using a database and authentication

## Troubleshooting

**Issue**: "Failed to generate tailored resume"
- Check that your Anthropic API key is correct in `.env`
- Verify you have API credits available
- Check the server console for detailed error messages

**Issue**: PDF download not working
- Ensure both frontend and backend are running
- Check browser console for errors
- Verify the proxy setting in `client/package.json`

## License

MIT

## Contributing

Contributions welcome! Please open an issue or submit a pull request.
