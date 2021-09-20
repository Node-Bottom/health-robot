const mongoose = require('mongoose');

module.exports = mongoose.model('users', new mongoose.Schema({
  id: String,
  name: String,
  content: String,
  number: Array,
}, { collection : 'health-robot' }));