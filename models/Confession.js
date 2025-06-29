const mongoose = require('mongoose');

const confessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  likesCount: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Confession', confessionSchema);
