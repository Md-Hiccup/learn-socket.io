var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})

// attach Socket.io to our HTTP server
// io = socketio.listen(server);

// handle incoming connections from clients
io.on('connection', function (socket) {
    console.log('inside sockets.on connections');
    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('room', function (room) {
        console.log('inside room : ', room)
        socket.join(room, roomFun);
    });

    var room = "abc123";
    // now, it's easy to send a message to just the clients in a given room
    // io.sockets.in(room).emit('message', 'what is going on, party people?');
    
    function roomFun(){
        io.to(room).emit('message', 'what is going on, party people?');
    }
    // io.sockets.in("abc123").emit('message', 'anyone in this room yet?');
});

http.listen(3000, function (req, res) {
    console.log('Server is running on Port: 3000');
});