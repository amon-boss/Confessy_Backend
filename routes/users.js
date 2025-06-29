const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Confession = require('../models/Confession');

// Récupérer les confessions d'un utilisateur
router.get('/:id/confessions', async (req, res) => {
  try {
    const confessions = await Confession.find({ userId: req.params.id });
    res.json({ success: true, confessions });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Erreur' });
  }
});

// Mettre à jour profil
router.post('/:id/update', async (req, res) => {
  const { username, isAnonymous } = req.body;
  try {
    const user = await User.findById(req.params.id);
    user.username = isAnonymous ? null : username;
    user.isAnonymous = isAnonymous;
    await user.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Erreur mise à jour' });
  }
});

// Supprimer le compte
router.post('/:id/delete', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Confession.deleteMany({ userId: req.params.id });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Erreur suppression' });
  }
});

module.exports = router;
