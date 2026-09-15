// LOCAL DEVELOPMENT SERVER ONLY.
// ─────────────────────────────
// For Vercel (serverless), the app is exported from `app.js` and served by `api/index.js`.
// This file (node server.js) runs the app locally with Socket.IO realtime.
require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const { connectDB } = require('./db');

const server = http.createServer(app);

// Socket.IO Setup (local dev only)
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : true,
    methods: ["GET", "POST"]
  }
});
app.set('io', io);

io.on('connection', (socket) => {
  console.log('⚡ User Connected:', socket.id);
  socket.on('join-admin', () => socket.join('admin-room'));
  socket.on('join-user', (userId) => socket.join(`user-${userId}`));
});

// Connect DB then start listening
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB Error:', err.message);
    process.exit(1);
  });