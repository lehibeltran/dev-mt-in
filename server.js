var express = require('express');
var config = require('./config.js');
var port = config.portNum;
var app = express();

app.use(express.static('public'));
app.use('/packages', express.static(__dirname + '/node_modules/'));

app.listen(port, function() {
    console.log('Making tacos at: ', port);
});