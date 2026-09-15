// Vercel serverless entry point.
// ──────────────────────────────
// Vercel serves the Express app directly (no app.listen — the platform
// provides the HTTP server). This is the file referenced by vercel.json.
const app = require('../app');

module.exports = app;