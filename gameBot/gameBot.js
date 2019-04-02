//Setup

import { Minesweeper } from  'Minesweeper';
import { Tweet } from 'tweet_obj.js';

var Twit = require('twit');
var config = require('./config.js')
var T = new Twit(config);
var game = new Minesweeper();

//Game Setup
var streaming = true;
var startCountdown = true;
var record = true;
var playing = true;
var responses = []
var round = 1;
var gameCount = 1;
var stream = T.stream('statuses/filter', { track: '@Wil16329555'})

function sendOutGame(){
	var commencement = gameCount + ". Let's play Minesweeper for the\nI will use the first valid play in format" + '"x,y"\n' + "For every valid play that is not a bomb you will gain 100pts in the leaderboard\nFor every guess that is a bomb you will get -100pts in the leaderboard";
	console.log("Sending Out Game");
	T.post('statuses/update', {status: commencement});
}

function endStream() {
	record = false;
	stream.stop();
	var play = makePlay();
	if (play) {
		console.log("Stream Ended, Play Made")
		record = true;
		streaming = true;
		getReplys();
	} else {
		console.log("Game Lost/Won, Bye Bye!");
	}
}

function getReplys() {
	
	console.log("Streaming input")

	responses = []
	var toPost = "Round " + round + ": You have 30 seconds\n" + game.display();
	T.post('statuses/update', {status: toPost});
	round++;

	console.log("Streaming now");
	
	setTimeout(endStream, 15000);

	stream.on('tweet', function (tweet) {
		if (record) {
			console.log("Response Recorded!");
			var response = new Tweet(tweet.user.screen_name, tweet.user.id, tweet.text)
			responses.push(response);
		} else {
			console.log("Response Ignored");
		}
	})
}

function makePlay() {
	const plays = responses;
	T.post('statuses/update', {status: "Time's up..."})
	console.log("Making Play");
	if (plays.length == 0) {
			console.log("No Plays");
			T.post('statuses/update', {status: (gameCount + ". Noone Played, I'm Sad and Lonely =(")});
			game.reset();
			playing = false;
			stream.stop();
			return false;
	} else {
		for (var play = 0; play < plays.length; play++) {
			var rawResponse = plays[play].play.split(' ');
			var response = rawResponse[1].split(',');
			var row = parseInt(response[0]);
			var col = parseInt(response[1]);

			var validPlay = game.play(row, col);
			if (validPlay) {
				if (game.touchedMine(row, col)) {
					console.log("Play Exploded");
					T.post('statuses/update', {status: ("You have hit a mine:\n" + game.display)});
					reply(response, true);
					game.reset();
					playing = false;
					stream.stop();
					return false;
				} else if (game.win()) {
					console.log("Play Won");
					T.post('statuses/update', {status: ("You have Won, No Bombs Hit!:\n" + game.display)});
					reply(response, false, true);
					game.reset();
					playing = false;
					stream.stop();
					return false;
				} else {
					console.log("Play accepted");
					reply(response);
					return true;
				}
			}
		}
	}
}

function reply(response, lost = false, win = false) {
	var reply = "@" + response[0];
	var outcome = '';

	if (lost) {
		reply += " ,you have hit a bomb";
		outcome = 'bomb';
	} else if (win) {
		reply += " ,you have won the game YAYYY!!!" ;
		outcome = 'win';
	} else {
		reply += " your play has been chosen";
	}

	T.post('statuses/update', {status: reply, in_reply_to_status_id: response[1] }, function (err, data, response) {
		if (err) {
			console.log(err)
		} else {
			console.log('I have Tweetered!')
		}
	})

	switch(outcome) {
		case 'bomb':
			outcome = "@" + response[0] + " hit a bomb!\n" + game.display();
			break;

		case 'win':
			outcome = "@" + response[0] + " won the game\n" + game.display();
			break;

		default:
			outcome = "@" + response[0] + " made the play\n" + game.display();
	}

	T.post('statuses/update', {status: outcome}, function (err, data, response) {
		if (err) {
			console.log(err)
		} else {
			console.log('I have Tweetered!')
		}
	})
}

function main() {
	sendOutGame();
	setTimeout(getReplys, 1000);
}


//Every Day!!
//setInterval(main, 300000);
//main();










