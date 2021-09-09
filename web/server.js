const express = require('express');
const app = express();
const port = 3000;
const base = `${__dirname}/public`;
app.use(express.static('public'));

app.get('/login', (req, res) => {
    res.sendFile(`${base}/login.html`);
  });

app.get('/home', (req, res) => {
    res.sendFile(`${base}/home.html`);
  });

app.get('/home1', (req, res) => {
    res.sendFile(`${base}/home2.html`);
  });

  app.get('/registration', (req, res) => {
    res.sendFile(`${base}/registration.html`);
  });
  
app.get('/', function (req, res) {
    res.sendFile(`${base}/home.html`);
  });
app.get('*', (req, res) => {
    res.sendFile(`${base}/404.html`);
  });

app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
