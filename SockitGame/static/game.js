var socket = io();

var movement = {
	up: false,
	down: false,
	left: false,
	right: false
}

document.addEventListener('keydown', function(event) {
	switch (event.keyCode) {
		case 87: // W
			movement.up = true;
			break;
		case 65: // A
			movement.left = true;
			break;
		case 83: // S
			movement.down = true;
			break;
		case 68: // D
			movement.right = true;
			break;
	}
});
document.addEventListener('keyup', function(event) {
	switch (event.keyCode) {
		case 87: // W
			movement.up = false;
			break;
		case 65: // A
			movement.left = false;
			break;
		case 83: // S
			movement.down = false;
			break;
		case 68: // D
			movement.right = false;
			break;
	}
});

socket.emit('new player');

setInterval(function() {
	socket.emit('movement', movement);
}, 1000/60);

var canvas = document.getElementById('canvas');

canvas.width = 300;
canvas.height = 300;
var context = canvas.getContext('2d');

socket.on('state', function(players) {
	console.log(players);
	context.clearRect(0, 0, 300, 300);

	for (var id in players) {
		var player = players[id];
		context.fillStyle = player.color;
		context.beginPath();
		context.arc(player.x, player.y, 10, 0, 2*Math.PI);
		context.fill();
	}
});
