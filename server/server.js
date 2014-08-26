var http  = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);

var io = require('socket.io')(server, {origins:'*:*'});
io.set( 'origins', '*:*' );


app.get('/', function(req, res){
  res.send('hello world');
});


var serverPort = '8080';
server.listen(serverPort, function () {
    console.log("Express http server listening on port " + serverPort);
});


//var io = require('socket.io').listen(8080);

io.sockets.on('connection', function (socket) {
  console.log(socket.id + ' connected!');

  socket.emit('ping', { message: 'Hello from server ' + Date.now() });

  socket.on('pong', function (data) {
    console.log(data.message);
  });

  socket.on('disconnect', function () {
    console.log(socket.id +  ' disconnected!');
    socket.broadcast.emit('ping', { message: socket.id +  ' disconnected!' });
  });
});
