const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  contact: { type: String, unique: true },
  password: String,
  username: { type: String, unique: false },
  isAnonymous: Boolean
});

module.exports = mongoose.model('User', userSchema);
