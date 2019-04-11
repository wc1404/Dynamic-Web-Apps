const express = require("express");
const bodyParser = require('body-parser');
const request = require('request');
const fs = require('fs');

const file = 'database.JSON';

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

//Home Routes
app.get('/', function(req,res){
	console.log('At Home Page');
	res.render('home');
});

app.post('/SignUp', function (req, res) {
	console.log('Going to SignUp Page');
	res.redirect('/appSignUp');
});

app.post('/Login', function (req, res) {
	console.log('Going to Login Page');
	res.redirect('/appLogin');
});

//Sign Up Routes
app.get('/appSignUp', function(req, res){
	console.log('At SignUp Page');
	res.render('signUp');
});

app.post('/appSignUp', function (req, res) {
	let email = req.body.email;
	let username = req.body.username;
	let password = req.body.password;

	console.log('Signing up User: ' + username);

	let data = fs.readFileSync(file);
	let userBase = JSON.parse(data);

	userBase[username] = [password, email];
	let newUser = JSON.stringify(userBase);

	fs.writeFile(file, data, completeSignUp);
	function completeSignUp(err) {
		console.log('Sign Up Complete!, going to login');
		res.redirect('/appLogin');
	}
});

//Login Routes
app.get('/appLogin', function(req,res){
	console.log('At Login Page');
	res.render('login');
});

app.post('/appLogin', function (req, res) {
	let username = req.body.username;
	let password = req.body.password;

	let info = {
			user: username, 
			pass: password
		};

	if (Authenticate(info)) {
		res.redirect('/QRME');
	} else {
		console.log('failed login');
		res.render('appLogin', {error: err});
	}
});

function Authenticate(info) {
	let data = fs.readFileSync(file);
	let userBase = JSON.parse(data);
	console.log(userBase);
	console.log(info.user);

	return true;
}

//App routes
app.get('/QRME', function(req,res){
	res.render('views');
});

app.post('/QRME', function (req, res) {
	let website = req.body.website;
	let size = '_' + req.body.size;

	if (size == '_') {
		size = '';
	}

	let url = 'https://qrtag.net/api/qr'+ size +'.png?url=https://'+ website;
	
	res.render('views', {code: url});
});

let port = 5000;
app.listen(port, function () {
	console.log('Listening on port '+ port +'...');
});