var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('view', 'html');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
})

var clients = 0;
io.on('connection', function(socket) {
   clients++;
//    io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});     
    socket.emit('newclientconnect', { description: 'Hey, Welcome'} );
    socket.broadcast.emit('newclientconnect', { description: clients + ' clients connected '});
    socket.on('disconnect', function () {
      clients--;
    //   io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
      socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'});
   });
   
});

/*************  Namespace *************/
// var nsp = io.of('/my-custom');
// nsp.on('connection', function(nspSocket){
//     console.log('someone connected');
//     nsp.emit('hi', 'hello buddy')
// });

http.listen(3000, function() {
   console.log('listening on localhost:3000');
});