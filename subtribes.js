
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
// const mongoose = require('mongoose');
const app = express();

// need to add basic authorisation to keep editing limited to people with the pw. worry about that later tho.

app.set('view engine', 'pug')
app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));

let port = 3002;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

app.get('/', function (req, res) {
  res.render('index', { active: 'home'})
})
app.get('/subtribe', function (req, res) {
  res.render('index', { active: 'subtribe'})
})
