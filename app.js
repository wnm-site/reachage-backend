require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// CORS — allow all origins.
// Safe because auth uses `Authorization: Bearer` headers (no cookies/credentials mode),
// so a blanket * cannot be abused to carry session cookies. This also means a stale or
// missing CORS_ORIGIN env var can never block a deployed frontend again.
app.use(cors());
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