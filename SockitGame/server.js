// Dependencies.
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

const port = 10000;

app.set('port', port);
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(port, function() {
	console.log('Listening on port: '+ port);
});

function randint(min, max) {
	if (min < 0) {
		min *= -1;
	}

	if (max < 0) {
		max *= -1;
	}

	return Math.floor(Math.random()*(max-min))+min;
}

const colors = ['blue', 'black', 'green', 'red', 'yellow', 'orange', 'purple', 'pink'];

var players = {};
io.on('connection', function(socket) {
	socket.on('new player', function() {
		players[socket.id] = {
			x: randint(0, 150),
			y: randint(0, 150),
			color: colors[randint(0,4)]
		};
		console.log('Player '+ socket.id +' has joined');
	});

	socket.on('movement', function(data) {
		var player = players[socket.id] || {};
		if (data.left) {
			player.x -= 5;
		}
		if (data.up) {
			player.y -= 5;
		}
		if (data.right) {
			player.x += 5;
		}
		if (data.down) {
			player.y += 5;
		}
	});

	socket.on('disconnect', function() {
    	delete players[socket.id];
    	console.log('Player '+ socket.id +' has left the room')
	});

});

setInterval(function() {
	io.sockets.emit('state', players);
}, 1000/60);
