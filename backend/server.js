const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
// CHANGED: Using Port 5001 to avoid Mac AirPlay conflict
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure Data File Exists
const dataDir = path.join(__dirname, 'data');
const dataFile = path.join(dataDir, 'students.json');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
  console.log('Created missing "data" folder.');
}

if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify([], null, 2));
  console.log('Created missing "students.json" file.');
}

// Routes
app.use('/api/students', studentRoutes);

// Start Server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Press Ctrl+C to stop the server');
});

server.on('error', (err) => {
  console.error('Server Error:', err);
});

// Keep-Alive
setInterval(() => {}, 10000);