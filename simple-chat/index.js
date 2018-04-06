var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', function(socket){
    // console.log('User Connected');
    socket.emit('message', 'you are connected');
    socket.on('message', function(msg){
        console.log('message: ', msg);
        socket.emit('message', msg);
    });
    socket.on('disconnect', function(){
        console.log('User Disconnected');
    })
});

http.listen(3000, function(){
    console.log('Server is running on port 3000');
})