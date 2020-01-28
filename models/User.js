const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['user', 'publisher'],
    default: 'user',
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: String,
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('User', UserSchema);
