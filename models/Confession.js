const mongoose = require('mongoose');

const confessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Confession', confessionSchema);
