const express = require("express");
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function(req,res){
	res.render('views');
});

const request = require('request');

app.post('/', function (req, res) {
	let website = req.body.website;
	let size = '_' + req.body.size;

	if (size == '_') {
		size = '';
	}

	let url = 'https://qrtag.net/api/qr'+ size +'.png?url=https://'+ website;
	console.log(url);
	
	res.render('views', {code: url});
})

let port = 5000;

app.listen(port, function () {
	console.log('Listening on port '+ port +'...');
});
