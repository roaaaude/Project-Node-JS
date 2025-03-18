const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const connectDB = require('./config/db');
const seedData = require('./utils/seedData');
const usersRoutes = require('./routes/users.routes');
const cardsRoutes = require('./routes/cards.routes');
const { notFound, errorHandler } = require('./middleware/error.middleware');

// Create Express app
const app = express();

// Connect to MongoDB
connectDB();

// Seed initial data
seedData();

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Create a write stream for access logs
const accessLogStream = fs.createWriteStream(
  path.join(logsDir, 'access.log'),
  { flags: 'a' }
);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('dev'));

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/cards', cardsRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Business Card API' });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; 