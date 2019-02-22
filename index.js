const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();

// need to add basic authorisation to keep editing limited to people with the pw. worry about that later tho.

var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/tsndb';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// models for mongoose
let Subtribe = require('./models/subtribe.js');

app.set('view engine', 'pug')
app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));

let port = 3002;

app.listen(port, () => {
  console.log(port);
});

app.get('/', function(req, res) {
  res.render('index', {
    active: 'home'
  })
})

app.get('/about', function(req, res) {
  res.render('about', {
    active: 'about'
  })
})

app.get('/subtribes', function(req, res) {
  db.collection("subtribes").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    res.render('subtribes', {
      active: 'subtribes',
      array: result
    })
  });
})

app.get('/village/:id', function(req, res) {
  db.collection('geography').findOne({'id':req.params.id}).then(function(doc) {
    if(!doc) {
      throw new Error('No record found.');
    } else {
      console.log(doc);
      // console.log(result);
      res.render('village', {
        active: 'village',
        doc: doc
      })
    }
  });
})

/* This stuff will need to go to another file */
let subtribes = ['mossang', 'joglei', 'kimsing', 'champang']
for (let i = 0; i < subtribes.length; i++) {
  console.log(subtribes[i])
}
