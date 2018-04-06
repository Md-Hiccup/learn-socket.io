var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', function(socket){
    console.log('user connected');

    //Send a message after a timeout of 4seconds
    setTimeout(function() {
        // socket.send('Sent a message 4seconds after connection!');
        socket.emit('testerEvent', { description: 'A custom event named testerEvent'});
    }, 4000);
    
    socket.on('clientEvent', function(data){
        console.log(data);
    })

    socket.on('disconnect', function(){
        console.log('user disconnected');
    })
});

http.listen(3005, function(){
    console.log('Server is running on Port: 3005');
});