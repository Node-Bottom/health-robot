const mongoose = require('mongoose');

module.exports = mongoose.model('users', new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  mobile: String,
  access: String,
  pass: String,
  bpData: Array

}, { collection : 'health-robot' }));