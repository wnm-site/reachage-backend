const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
exports.register = async (req, res) => {
  try {
    const { name, phone, email, password, terms } = req.body;

    if (!terms) {
      return res.status(400).json({ message: 'You must accept the terms and conditions' });
    }

    const existingUser = await User.findOne({ $or: [{ phone }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this phone or email' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({ name, phone, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({ user: { id: user._id, name: user.name, phone: user.phone, email: user.email, role: user.role, isVerified: user.isVerified, isSuspended: user.isSuspended }, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(200).json({ user: { id: user._id, name: user.name, phone: user.phone, email: user.email, role: user.role, isVerified: user.isVerified, isSuspended: user.isSuspended }, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};