const mongoose = require('mongoose');

const addMoneySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  upiRef: { type: String, default: '' },
  // Optional payment screenshot stored as base64 data URL
  screenshot: { type: String, default: '' },
  status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' }
}, { timestamps: true });

module.exports = mongoose.model('AddMoney', addMoneySchema);