/**
 * It contains and mantains the user details.
 * It adds the new user and display the user details.
 */
 const express = require('express');
 var plotly = require('plotly')("kinshuk9449", "S1gWWYdPb9eobyhjVRHA")


const port = 3010;


var bp =[]
var temp = []
var range = [];

 
 var app = express();
 
 const bodyParser = require('body-parser');
 app.use(bodyParser.urlencoded({ extended: false }))
 app.use(bodyParser.json())
 
 app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
   });
   
 
 const mongoose = require('mongoose');
 
 const User = require('./models/users');
 
 mongoose.connect('mongodb+srv://kinshuk:Kinshu123@cluster0.8vugi.mongodb.net/users?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

 app.get('/api/test', (req, res) => {
     res.send('The API is working!');
 });
 
 app.get('/api/bp', (req, res) => {
     User.find({email:"jainkinshuk112@gmail.com"}, (err, users) => {
         for (var i=0; i< users[0].bpData.length; i++)
         {
             bp[i] = users[0].bpData[i].bp;
             temp[i] = users[0].bpData[i].temp;
             range[i] = i+1;
         }
         var data = [{y:bp, x:range, type: 'line'}];
         var layout = {fileopt : "overwrite", filename : "bp-data"};
         plotly.plot(data, layout, function (err, msg) {
            if (err) return console.log(err);
            console.log(msg);
            var chart = msg.url+".embed";
            console.log(chart);
            var page = "<p>Graph below:</p>"+"<iframe width=800 height=600 src=\'"+chart+"\'></iframe>";
            res.send(page);
        });
     });
 });

 app.get('/api/temp', (req, res) => {
    User.find({email:"jainkinshuk112@gmail.com"}, (err, users) => {
        for (var i=0; i< users[0].bpData.length; i++)
        {
            bp[i] = users[0].bpData[i].bp;
            temp[i] = users[0].bpData[i].temp;
            range[i] = i+1;
        }
        var data = [{y:temp, x:range, type: 'line'}];
        var layout = {fileopt : "overwrite", filename : "temperature-data"};
        plotly.plot(data, layout, function (err, msg) {
           if (err) return console.log(err);
           console.log(msg);
           var chart = msg.url+".embed";
           console.log(chart);
           var page = "<p>Graph below:</p>"+"<iframe width=800 height=600 src=\'"+chart+"\'></iframe>";
           res.send(page);
       });
    });
});
 
 

 
 app.listen(port, () => {
     console.log(`listening on port ${port}`);
 });
 
 
