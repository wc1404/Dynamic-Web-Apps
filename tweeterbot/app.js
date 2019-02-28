//Precursor
console.log("I'M ALIVEEE...");

//Setup
var Twit = require('twit');
var config = require('./config.js')
var T = new Twit(config);

//Body
var tandon = ['-73.988832', '40.692207', '-73.985099', '40.696022']
var count = 0;
var countStop = 10;

var toPost = '';
 
var stream = T.stream('statuses/filter', {locations: tandon, language: 'en'})

stream.on('tweet', function (tweet) {
	count += 1;

	if (count == countStop) {
		toPost = 'ANDDD The ' + countStop + 'th post in Metrotech is by ' + tweet.user.name + ' saying ' + ' "' tweet.text + '" ';
		T.post('statuses/update', { status: toPost })
		count = 0;
		toPost = '';
		console.log("Posted");
	}
	console.log(count);
})