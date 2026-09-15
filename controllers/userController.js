const User = require('../models/User');
const Transaction = require('../models/Transaction');
const AddMoney = require('../models/AddMoney');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create Add Money request (PENDING — admin approval required before wallet credit)
exports.addMoney = async (req, res) => {
  try {
    const { amount, upiRef, screenshot } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ message: 'Please provide a valid amount' });
    }
    if (screenshot && screenshot.length > 8000000) {
      return res.status(400).json({ message: 'Screenshot too large. Please upload a smaller image.' });
    }

    const request = await AddMoney.create({
      userId: req.user.id,
      amount: Number(amount),
      upiRef: upiRef || '',
      screenshot: screenshot || ''
    });

    // Notify admin panel for real-time update
    const io = req.app.get('io');
    if (io) io.to('admin-room').emit('new-addmoney', request);

    res.status(201).json({
      message: 'Payment submitted! Your top-up is pending approval.',
      request
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all add-money requests for the logged-in user
exports.getAddMoneyRequests = async (req, res) => {
  try {
    const requests = await AddMoney.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};