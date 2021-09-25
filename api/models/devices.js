const mongoose = require('mongoose');

module.exports = mongoose.model('Device', new mongoose.Schema({
  id: String,
  email: String,
  deviceid: String,
  devicename: String,
  devicelocation: String
}, { collection : 'health-robot' }));