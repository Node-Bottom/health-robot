const mongoose = require('mongoose');

module.exports = mongoose.model('users', new mongoose.Schema({
  id: String,
  email: String,
  mobile: String,
  access: String,
  pass: String,

}, { collection : 'health-robot' }));