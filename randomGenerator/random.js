
const mqtt = require('mqtt');
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const randomCoordinates = require('random-coordinates');
const randomInt = require('random-int');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://kinshuk:Kinshu123@cluster0.8vugi.mongodb.net/users?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

const User = require('./models/users');

const port = 5005;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

client.on('connect', () => {
  client.subscribe('/bpData');
  console.log('mqtt connected');
});

client.on('message', (topic, message) => {
  if (topic == '/bpData') {
    const data = JSON.parse(message);
    User.findOne({ "email": data.deviceId }, (err, device) => {
      if (err) {
        console.log(err)
      }

      const { bpData } = device;
      const { bp, temp } = data;
      const body = {
        "value1": temp,
        "value2": bp
      }
      console.log(bp);
      if (temp >= 100) {
        

          axios.post('https://maker.ifttt.com/trigger/temp/with/key/q-QKxOXnErbECMlFLdb4z', { "value1": temp });


      }
      if (bp >= 120) {
        axios.post('https://maker.ifttt.com/trigger/bp/with/key/q-QKxOXnErbECMlFLdb4z', { "value1": bp });
      }


      bpData.push({ bp, temp });
      device.bpData = bpData;

      device.save(err => {
        if (err) {
          console.log(err)
        }
      });
    });
  }
});

app.put('/sensor-data', (req, res) => {

  const { deviceId } = req.body;
  const bp = randomInt(110, 130);
  const temp = randomInt(95, 105);

  const topic = `/bpData`;
  const message = JSON.stringify({ deviceId, bp, temp });

  client.publish(topic, message, () => {
    res.send('published new message');
  });
});

app.post('/send-command', (req, res) => {
  const { deviceId } = req.body;
  const command = "test";
  const topic = `/kin/command/${deviceId}`;
  const body = { deviceId };
  axios.put('http://localhost:5005/sensor-data', body);
  client.publish(topic, command, () => {
    res.send('published new message');
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
