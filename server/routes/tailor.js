const express = require('express');
const router = express.Router();
const { tailorResume } = require('../services/claude');
const { generatePDF } = require('../services/pdf');

router.post('/generate', async (req, res) => {
  try {
    const { masterResume, jobDescription } = req.body;

    if (!masterResume || !jobDescription) {
      return res.status(400).json({
        error: 'Both masterResume and jobDescription are required'
      });
    }

    // Tailor the resume using Claude
    console.log('Tailoring resume with Claude...');
    const tailoredResume = await tailorResume(masterResume, jobDescription);

    // Generate PDF
    console.log('Generating PDF...');
    const pdfBuffer = await generatePDF(tailoredResume);

    // Send PDF as response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=tailored-resume.pdf');
    res.send(pdfBuffer);

  } catch (error) {
    console.error('Error tailoring resume:', error);
    res.status(500).json({
      error: 'Failed to tailor resume',
      details: error.message
    });
  }
});

module.exports = router;
