const mongoose = require('mongoose');

module.exports = mongoose.model('Device', new mongoose.Schema({
  id: String,
  deviceid: String,
  devicename: String,
  devicelocation: String,
  sensorData: Array
}, { collection : 'health-robot' }));