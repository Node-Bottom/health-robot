/**
 * It contains and mantains the user details.
 * It adds the new user and display the user details.
 */
const express = require('express');

const fs = require('fs')
const https = require('https')
var sslOptions = {
key: fs.readFileSync('key.pem'),
cert: fs.readFileSync('cert.pem'),
passphrase: 'kjapis'
};

var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
const port = 5001;

const mongoose = require('mongoose');

const User = require('./models/users');

mongoose.connect('mongodb+srv://kinshuk:Kinshu123@cluster0.bmsjk.mongodb.net/users?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/api/test', (req, res) => {
    res.send('The API is working!');
});

/**
* @api {get} /api/users AllDevices An array of all users
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
*  [
*    {
*      "_id": "611f954f8312cb38bcce9816",
*      "email": "jainkinshuk112@gmail.com",
*      "mobile" : "0480243821",
*      "access" : "admin",
*      "pass": "Kinshu@123"
*    }
*  ]
* @apiErrorExample {json} Error-Response:
*  {
*    "Device does not exist"
*  }
*/
app.get('/api/users', (req, res) => {
    User.find({}, (err, users) => {
        return err
            ? res.send(err)
            : res.send(users);
    });
});


app.post('/api/users', (req, res) => {
    const { id, email, mobile, access, pass } = req.body;
    const newUser = new User({
        id,
        email,
        mobile,
        access,
        pass
    });
    newUser.save(err => {
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

