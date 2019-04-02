console.log('The server is up');

const express = require('express');

const fs = require('fs');

const app = express();

const port = 3000;

const server = app.listen(port, listening);
function listening() {
	console.log('listening on port ' + port);
}

function getNames() {
	let rawDataR = fs.readFileSync('data.JSON');
	let dataR = JSON.parse(rawDataR);
	let names = dataR;
	return names;
}

app.get('/whoIKnow', whoIKnow);

function whoIKnow(req, res) {
	console.log('Retrieving Learned Names...');

	let names = getNames();
	let reply = 'I have met:\n' + JSON.stringify(names, null, 4);

	res.send(reply);
}

app.get('/meet/:name', learnName);

function done() {
	console.log('New Name Learned!');
}

function learnName(req, res) {
	console.log('Attempting to Learn New Name...');
	const data = req.params;
	const newName = data.name;
	let names = getNames();

	let reply = '';

	console.log('Adding Name...');

	names[newName] = '  ';

	let write = JSON.stringify(names, null, 4);
	fs.writeFile('data.JSON', write, done);
	var dataW = fs.writeFileSync('data.JSON');

	reply = 'Nice to meet you ' + newName;
	res.send(reply);
}
