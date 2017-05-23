var socket = io('http://localhost:3000', {forceNew: true});

socket.on('tarjeta', function(data) {
    console.log(data);
});

socket.emit('tarjeta', null);
