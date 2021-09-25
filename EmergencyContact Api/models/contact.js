const mongoose = require('mongoose');

module.exports = mongoose.model('contact', new mongoose.Schema({
  email: String,
  name: String,
  content: String,
  number: String,
}, { collection : 'health-robot' }));