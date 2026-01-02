const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const tailorRoutes = require('./routes/tailor');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Routes
app.use('/api/tailor', tailorRoutes);

// Serve master resume
app.get('/api/master-resume', (req, res) => {
  res.sendFile(path.join(__dirname, '../data/master-resume.json'));
});

// Update master resume
app.post('/api/master-resume', (req, res) => {
  const fs = require('fs');
  const resumePath = path.join(__dirname, '../data/master-resume.json');
  fs.writeFileSync(resumePath, JSON.stringify(req.body, null, 2));
  res.json({ success: true, message: 'Master resume updated successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
