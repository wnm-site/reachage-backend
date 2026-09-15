const mongoose = require('mongoose');

const rechargeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mobileNumber: { type: String, required: true },
  operator: { type: String, required: true },
  amount: { type: Number, required: true },
  // PROCESSING = user paid from wallet, admin needs to do the recharge on their POS
  // DONE      = admin completed the recharge
  // FAILED    = recharge failed, money refunded to wallet
  status: { type: String, enum: ['PROCESSING', 'DONE', 'FAILED', 'PENDING', 'SUCCESS'], default: 'PROCESSING' }
}, { timestamps: true });

module.exports = mongoose.model('Recharge', rechargeSchema);