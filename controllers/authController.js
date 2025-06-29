const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { email, phone, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email, phone, password: hashed });
    await user.save();
    res.json({ message: 'Registered successfully', userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.setUsername = async (req, res) => {
  const { userId, username, anonymous } = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, { username, anonymous }, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, phone, username, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ email }, { phone }, { username }]
    });

    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
