const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  confessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Confession' }
});

module.exports = mongoose.model('Like', likeSchema);
