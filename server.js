require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN.split(',') }));
app.use(express.json({ limit: '10mb' })); // allow base64 screenshot uploads

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => res.json({ message: 'Backend API Running' }));

// Socket.IO Setup
const io = new Server(server, {
  cors: { origin: process.env.CORS_ORIGIN.split(','), methods: ["GET", "POST"] }
});
app.set('io', io);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ MongoDB Error:', err);
    process.exit(1);
  });

// Socket.IO Connection
io.on('connection', (socket) => {
  console.log('⚡ User Connected:', socket.id);
  socket.on('join-admin', () => socket.join('admin-room'));
  socket.on('join-user', (userId) => socket.join(`user-${userId}`));
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));