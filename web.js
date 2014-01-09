var http = require('http');
var server = http.createServer(require('./app.js'));

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket){
  socket.on('send', function (data) {
    data.date = new Date();
    io.sockets.emit('res', data);
  });
});

server.listen(3000);
