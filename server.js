var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var config = require('./app/config');
var app = express();

// Database Setup
mongoose.connect(config.database.mongodb.uri);
mongoose.connection.on('error', function(err) {
  console.log('Error: Could not connect to MongoDB.');
});

// Express Setup
app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// App Routes
require('./app/routes')(app);

var server = app.listen(config.app.port, function () {
  console.log('Devshop server listening on port ' + server.address().port);
});

module.exports = app;