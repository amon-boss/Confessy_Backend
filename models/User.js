const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String },
  phone: { type: String },
  password: { type: String, required: true },
  username: { type: String },
  anonymous: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);
