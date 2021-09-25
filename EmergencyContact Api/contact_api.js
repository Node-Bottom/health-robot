/**
 * It contains and mantains the user details.
 * It adds new emergency contact.
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
 

 //a custom middleware in api.js that attaches response headers for cross-origin requests
 app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
   });
   
 const port = 5004;
 
 const mongoose = require('mongoose');
 
 const Contact = require('./models/contact');

 mongoose.connect('mongodb+srv://kinshuk:Kinshu123@cluster0.8vugi.mongodb.net/contact?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
 
 //testing
 app.get('/api/test', (req, res) => {
     res.send('The API is working!');
 });
 
 //GET endpoint to retrieve the emergency contact
 app.get('/api/contact', (req, res) => {
     Contact.find({}, (err, contact) => {
         return err
             ? res.send(err)
             : res.send(contact);
     });
 });
 
 //POST endpoint for add new emergency contact 
 //and that is ready to write to the Mongo DB
 app.post('/api/contact', (req, res) => {
     const { email, name, content, number } = req.body;
     const newContact = new Contact({
         email,
         name,
         content,
         number
     });
     newContact.save(err => {
         return err
             ? res.send(err)
             : res.send('successfully added emergency contact number');
     });
 });
 
 app.use(express.static(`${__dirname}/public/generated-docs`));
 
 app.get('/docs', (req, res) => {
   res.sendFile(`${__dirname}/public/generated-docs/index.html`);
 });
 
 app.listen(port, () => {
     console.log(`listening on port ${port}`);
 });
 
