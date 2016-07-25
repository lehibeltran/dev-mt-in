var express = require('express');
var config = require('./config.js');
var jsonServer = require('json-server');
var databaseServer = jsonServer.create();
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();

var app = express();
app.use(express.static('public'));
app.use('/packages', express.static(__dirname + '/node_modules/'));

app.listen(config.portNum, function() {
    console.log('Making tacos at: ', config.portNum);
});

databaseServer.use(middlewares);
databaseServer.use(router);
databaseServer.listen(config.dataPort);