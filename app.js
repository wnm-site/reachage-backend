require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// CORS — allow every origin listed in CORS_ORIGIN (comma separated)
app.use(cors({
  origin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map(o => o.trim())
    : '*'
}));
app.use(express.json({ limit: '10mb' })); // allow base64 screenshot uploads

app.get('/', (req, res) => res.json({ message: 'Backend API Running' }));

app.get('/health', async (req, res) => {
  try {
    await connectDB();
    res.json({ status: 'ok', db: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'error', db: 'disconnected', error: err.message });
  }
});

// Ensure MongoDB is connected before handling a request.
// Safe on Vercel (lazy + cached connection) and identical behaviour locally.
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    res.status(500).json({ message: 'Database connection failed. Check MONGO_URI env var.', error: err.message });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

module.exports = app;