const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Login
router.post('/login', async (req, res) => {
  const { userInput, password } = req.body;
  try {
    const user = await User.findOne({ $or: [{ contact: userInput }, { username: userInput }] });
    if (!user) return res.status(404).json({ success: false, error: 'Utilisateur introuvable.' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ success: false, error: 'Mot de passe incorrect.' });

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Erreur serveur.' });
  }
});

// Register
router.post('/register', async (req, res) => {
  const { contact, password } = req.body;
  try {
    const exist = await User.findOne({ contact });
    if (exist) return res.status(400).json({ success: false, error: 'Contact déjà utilisé.' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ contact, password: hashed, isAnonymous: true });
    await user.save();
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Erreur serveur.' });
  }
});

// Set username
router.post('/set-username', async (req, res) => {
  const { userId, username, isAnonymous } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, error: 'Utilisateur non trouvé.' });

    if (!isAnonymous && username) {
      const taken = await User.findOne({ username });
      if (taken) return res.status(400).json({ success: false, error: 'Pseudo déjà pris.' });
      user.username = username;
    } else {
      user.username = null;
    }

    user.isAnonymous = isAnonymous;
    await user.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Erreur serveur.' });
  }
});

module.exports = router;
