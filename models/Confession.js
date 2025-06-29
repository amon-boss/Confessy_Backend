const mongoose = require('mongoose');

const confessionSchema = new mongoose.Schema({
  userId: String,
  username: String,
  anonymous: Boolean,
  content: String,
  likes: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Confession', confessionSchema);
