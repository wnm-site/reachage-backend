const User = require('../models/User');
const Recharge = require('../models/Recharge');
const Transaction = require('../models/Transaction');
const AddMoney = require('../models/AddMoney');

exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'USER' });
    const totalRecharges = await Recharge.countDocuments();
    const pendingRecharges = await Recharge.countDocuments({ status: { $in: ['PENDING', 'PROCESSING'] } });
    res.json({ totalUsers, totalRecharges, pendingRecharges });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'USER' }).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Single User
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, email, walletBalance } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.email = email || user.email;
    if (walletBalance !== undefined) user.walletBalance = walletBalance;

    await user.save();
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Verify User
exports.verifyUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isVerified = !user.isVerified;
    await user.save();
    res.json({ message: `User ${user.isVerified ? 'verified' : 'unverified'} successfully`, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Suspend User
exports.suspendUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isSuspended = !user.isSuspended;
    await user.save();
    res.json({ message: `User ${user.isSuspended ? 'suspended' : 'activated'} successfully`, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get All Recharges for Admin
exports.getAllRecharges = async (req, res) => {
  try {
    const recharges = await Recharge.find().populate('userId', 'name phone').sort({ createdAt: -1 });
    res.json(recharges);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Recharge Status — admin does the recharge on their POS then marks it DONE
// DONE = recharge completed (wallet already debited at creation) → notify user
// FAILED = recharge failed → refund money to wallet + CREDIT transaction + notify user
// PROCESSING = admin reset back to processing (no wallet change)
exports.updateRechargeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'PROCESSING', 'DONE', 'SUCCESS' or 'FAILED'

    if (!['PROCESSING', 'DONE', 'SUCCESS', 'FAILED'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const recharge = await Recharge.findById(id);
    if (!recharge) return res.status(404).json({ message: 'Recharge not found' });

    // Prevent double refund if already FAILED
    if (recharge.status === 'FAILED' && status === 'FAILED') {
      return res.status(400).json({ message: 'Recharge is already failed and refunded' });
    }

    recharge.status = status;
    await recharge.save();

    const io = req.app.get('io');
    const masked = recharge.mobileNumber.replace(/.(?=.{2})/g, '*');

    if (status === 'FAILED') {
      // Refund the money back to the user's wallet
      const user = await User.findById(recharge.userId);
      user.walletBalance += recharge.amount;
      await user.save();

      await Transaction.create({
        userId: user._id,
        type: 'CREDIT',
        amount: recharge.amount,
        description: `Refund for failed recharge ${recharge.mobileNumber}`
      });

      // Notify the specific user via Socket.IO
      if (io && user) io.to(`user-${user._id}`).emit('recharge-updated', { message: `Your recharge of ₹${recharge.amount} to ${masked} failed. Money refunded to wallet.` });
    } else if (status === 'DONE' || status === 'SUCCESS') {
      // Recharge completed on admin's POS — notify user (wallet was already debited at creation)
      const user = await User.findById(recharge.userId);
      if (io && user) io.to(`user-${user._id}`).emit('recharge-updated', { message: `Your recharge of ₹${recharge.amount} to ${masked} is DONE! ✅` });
    }

    res.json({ message: `Recharge marked as ${status}`, recharge });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get All Transactions for Admin
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate('userId', 'name phone')
      .sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

    await Transaction.findByIdAndDelete(id);
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ========== ADD MONEY REQUESTS (CRUD) ==========

// Get all add-money requests
exports.getAddMoneyRequests = async (req, res) => {
  try {
    const requests = await AddMoney.find()
      .populate('userId', 'name phone')
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create add-money request (admin) — READ + CREATE part of CRUD
exports.createAddMoneyRequest = async (req, res) => {
  try {
    const { userId, amount, upiRef, status } = req.body;
    if (!userId || !amount || Number(amount) <= 0) {
      return res.status(400).json({ message: 'User and a valid amount are required' });
    }

    const request = await AddMoney.create({
      userId,
      amount: Number(amount),
      upiRef: upiRef || '',
      status: status || 'PENDING'
    });

    const populated = await AddMoney.findById(request._id).populate('userId', 'name phone');
    res.status(201).json({ message: 'Add money request created', addMoney: populated });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update add-money request (admin) — UPDATE part of CRUD
exports.updateAddMoneyRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, upiRef, status } = req.body;

    const request = await AddMoney.findById(id);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    if (amount !== undefined && Number(amount) > 0) request.amount = Number(amount);
    if (upiRef !== undefined) request.upiRef = upiRef;
    if (status !== undefined) request.status = status;

    await request.save();
    const populated = await AddMoney.findById(request._id).populate('userId', 'name phone');
    res.json({ message: 'Request updated', addMoney: populated });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Approve add-money request → credit wallet + create CREDIT transaction
exports.approveAddMoneyRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await AddMoney.findById(id);
    if (!request) return res.status(404).json({ message: 'Request not found' });
    if (request.status === 'APPROVED') return res.status(400).json({ message: 'Request already approved' });

    request.status = 'APPROVED';
    await request.save();

    const user = await User.findById(request.userId);
    user.walletBalance += request.amount;
    await user.save();

    await Transaction.create({
      userId: user._id,
      type: 'CREDIT',
      amount: request.amount,
      description: 'Wallet top-up approved'
    });

    const io = req.app.get('io');
    if (io) io.to(`user-${user._id}`).emit('addmoney-updated', { message: 'Your top-up was approved! Money added to wallet.' });

    res.json({ message: 'Top-up approved. Money added to wallet.', addMoney: request });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Reject add-money request
exports.rejectAddMoneyRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await AddMoney.findById(id);
    if (!request) return res.status(404).json({ message: 'Request not found' });
    if (request.status === 'REJECTED') return res.status(400).json({ message: 'Request already rejected' });

    request.status = 'REJECTED';
    await request.save();

    const io = req.app.get('io');
    const user = await User.findById(request.userId);
    if (io && user) io.to(`user-${user._id}`).emit('addmoney-updated', { message: 'Your top-up was rejected. Money not added. Please contact support.' });

    res.json({ message: 'Top-up rejected', addMoney: request });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete add-money request — DELETE part of CRUD
exports.deleteAddMoneyRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await AddMoney.findById(id);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    await AddMoney.findByIdAndDelete(id);
    res.json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};