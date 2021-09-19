/**
 * It contains and mantains the device details.
 * It adds the new device and display the device details.
 */
const express = require('express');

const fs = require('fs')
const https = require('https')
var sslOptions = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  passphrase: 'kjspi'
};

var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const port = 5000;

const mongoose = require('mongoose');

const Device = require('./models/devices');
mongoose.connect('mongodb+srv://kinshuk:Kinshu123@cluster0.8vugi.mongodb.net/devices?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/api/test', (req, res) => {
  res.send('The API is working!');
});

/**
* @api {get} /api/devices AllDevices An array of all devices
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
*  [
*    {
*      "_id": "613b2d113bd308c056cdd5a5",
*     "devicename": "Temperature sensor",
      "deviceid": 8920,
      "devicelocation": {
        "lat": -37.850026,
        "lon": 145.117683
      },
      "sensorData": [
        {
          "ts": "1529572230",
          "temp": 14
          
        }
      ]
    }
*    }
*  ]
* @apiErrorExample {json} Error-Response:
*  {
*    "Device does not exist"
*  }
*/
app.get('/api/devices', (req, res) => {
  Device.find({}, (err, devices) => {
    return err
      ? res.send(err)
      : res.send(devices);
  });
});

/**
* @api {get} /api/devices
* @apiParam {Number} id Users unique ID.
*/
/**
* @api {post} /api/devices
* @apiParam {String} deviceid          Mandatory Device Id.
* @apiParam {String} device            Mandatory Device type.
* @apiParam {String} devicebuilding    Mandatory Device Building.
* @apiParam {String} deviceromm        Mandatory Device Room.
 
*/
app.post('/api/devices', (req, res) => {
  const sensorData = [];
  const { id, deviceid, devicename, devicelocation } = req.body;
  const newDevice = new Device({
    id,
    deviceid,
    devicename,
    devicelocation,
    sensorData
  });
  newDevice.save(err => {
    return err
      ? res.send(err)
      : res.send('successfully added device and data');
  });
});

app.use(express.static(`${__dirname}/public/generated-docs`));

app.get('/docs', (req, res) => {
  res.sendFile(`${__dirname}/public/generated-docs/index.html`);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

