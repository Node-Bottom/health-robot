const mongoose = require('mongoose');

module.exports = mongoose.model('users', new mongoose.Schema({
  email: String,
  prescription: String,
  time: String,

}, { collection : 'health-robot' }));
