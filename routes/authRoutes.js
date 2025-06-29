const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { emailOrPhone, password } = req.body;
  try {
    const existingUser = await User.findOne({ emailOrPhone });
    if (existingUser) return res.status(400).json({ msg: 'Déjà inscrit' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ emailOrPhone, password: hashedPassword });
    await user.save();

    res.status(201).json({ msg: 'Inscription réussie' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { emailOrPhone, password } = req.body;
  try {
    const user = await User.findOne({ emailOrPhone });
    if (!user) return res.status(404).json({ msg: 'Utilisateur non trouvé' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ msg: 'Mot de passe incorrect' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
