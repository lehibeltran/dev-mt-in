var express = require('express');
var config = require('./config.js');
var jsonServer = require('json-server');
var databaseServer = jsonServer.create();
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();

var port = config.portNum;
var app = express();
app.use(express.static('public'));
app.use('/packages', express.static(__dirname + '/node_modules/'));

app.listen(port, function() {
    console.log('Making tacos at: ', port);
});

databaseServer.use(middlewares);
databaseServer.use(router);
databaseServer.listen(3000);