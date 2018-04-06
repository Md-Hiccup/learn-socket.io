var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})

users = [];
io.on('connection', function (socket) {
    console.log('A user connected');
    // socket.emit('message', 'Hello User');
    socket.on('setUsername', function (data) {
        console.log(data);
        if (users.indexOf(data) > -1) {
            socket.emit('userExists', data + ' username is already taken. Try some other username.');
        } else {
            users.push(data);
            socket.emit('userSet', {
                username: data
            });
        }
    })

    socket.on('msg', function (data) {
        //Send message to everyone
        io.sockets.emit('newmsg', data);
    })
})

http.listen(3000, function (req, res) {
    console.log('Server is running on Port: 3000');
})