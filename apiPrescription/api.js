/**
 * It contains and mantains the user details.
 * It adds the new user and display the user details.
 */
 const express = require('express');

 const fs = require('fs')
 const https = require('https')
 var sslOptions = {
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
   
 const port = 5002;
 
 const mongoose = require('mongoose');
 
 const User = require('./models/prescription');
 
 mongoose.connect('mongodb+srv://kinshuk:Kinshu123@cluster0.8vugi.mongodb.net/prescription?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
 
 app.get('/api/test', (req, res) => {
     res.send('The API is working!');
 });
 
 app.get('/api/prescription', (req, res) => {
     User.find({}, (err, prescription) => {
         return err
             ? res.send(err)
             : res.send(prescription);
     });
 });
 
 
 app.post('/api/prescription', (req, res) => {
     const { email, prescription, time } = req.body;
     const newUser = new User({
         email,
         prescription,
         time
     });
     newUser.save(err => {
         return err
             ? res.send(err)
             : res.send('successfully added prescriptions and data');
     });
 });
 
 app.use(express.static(`${__dirname}/public/generated-docs`));
 
 app.get('/docs', (req, res) => {
   res.sendFile(`${__dirname}/public/generated-docs/index.html`);
 });
 
 app.listen(port, () => {
     console.log(`listening on port ${port}`);
 });
 
 
