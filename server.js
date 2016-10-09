/*Simple server powered by node.js*/
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var express = require("express");

//put the folders in the server 
app.use(express.static(__dirname + '/app'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/app/index.html');

});

//RUN THIS IN LOCAL MACHINE
http.listen(88, function(){
  console.log('Magic running on 88');
});


