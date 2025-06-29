const express = require('express');
const Confession = require('../models/Confession');
const router = express.Router();

// Poster une confession
router.post('/', async (req, res) => {
  try {
    const newConf = new Confession(req.body);
    await newConf.save();
    res.status(201).json(newConf);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Obtenir les confessions (défilement infini)
router.get('/', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const confs = await Confession.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(confs);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
