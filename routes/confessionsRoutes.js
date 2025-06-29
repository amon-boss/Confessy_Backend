const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Confession = require('../models/Confession');

router.post('/', auth, async (req, res) => {
  try {
    const confession = new Confession({ user: req.userId, content: req.body.content });
    await confession.save();
    res.json(confession);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const confessions = await Confession.find().sort({ createdAt: -1 }).populate('user');
    res.json(confessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
