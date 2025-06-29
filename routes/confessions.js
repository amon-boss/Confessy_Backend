const express = require('express');
const router = express.Router();
const Confession = require('../models/Confession');

// Créer une confession
router.post('/', async (req, res) => {
  const { userId, username, anonymous, content } = req.body;
  try {
    const confession = new Confession({ userId, username, anonymous, content });
    await confession.save();
    res.json({ success: true, confession });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Erreur lors de la publication.' });
  }
});

// Récupérer toutes les confessions
router.get('/', async (req, res) => {
  try {
    const confessions = await Confession.find().sort({ createdAt: -1 });
    res.json(confessions);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});
