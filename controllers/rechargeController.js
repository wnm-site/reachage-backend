const Recharge = require('../models/Recharge');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

exports.initiateRecharge = async (req, res) => {
  try {
    const { mobileNumber, operator, amount } = req.body;
    const user = await User.findById(req.user.id);

    if (user.walletBalance < amount) {
      return res.status(400).json({ message: 'Insufficient wallet balance' });
    }

    // Deduct balance
    user.walletBalance -= Number(amount);
    await user.save();

    // Create Recharge Record — starts as PROCESSING (admin completes it on their POS)
    const recharge = await Recharge.create({
      userId: user._id,
      mobileNumber,
      operator,
      amount: Number(amount),
      status: 'PROCESSING'
    });

    // Create Debit Transaction
    await Transaction.create({
      userId: user._id,
      type: 'DEBIT',
      amount: Number(amount),
      description: `Recharge to ${mobileNumber}`
    });

    //  REAL-TIME: Notify Admin Panel
    const io = req.app.get('io');
    if (io) io.to('admin-room').emit('new-recharge', recharge);

    res.status(201).json({
      message: 'Recharge submitted! Your wallet has been charged and the recharge is now processing. You will be notified once it is completed.',
      recharge
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getMyRecharges = async (req, res) => {
  try {
    const recharges = await Recharge.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(recharges);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};