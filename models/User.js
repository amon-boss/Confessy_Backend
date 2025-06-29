const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  emailOrPhone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String },
  isAnonymous: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);
