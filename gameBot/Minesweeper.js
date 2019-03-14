class Tile {
	constructor(row, col) {
		this.isBomb = false;
		this.isVisible = false;
		this.bombsAround = 0;
		this.row = row;
		this.col = col;
	}
}

class Minesweeper {

	constructor(){
		this.board = [];
		this.boardOutput = '';
		this.visibleBoard = false;
		this.availableSpaces = 0;
		this.boardSize = 10;

		var row, col, neighborRow, neighborCol, checkRow, checkCol;

		for (row = 0; row < 10; row++) {
			var newRow = [];
			for (col = 0; col < 10; col++) {
				var newTile = new Tile(row, col);
				if ((Math.floor(Math.random() * 100)) <= 15){
                    newTile.isBomb = true;
                } else {
                	this.availableSpaces += 1;
                }
                newRow.push(newTile);
			}
			this.board.push(newRow)
		}

		for (row = 0; row < 10; row++) {
			for (col = 0; col < 10; col++) {

				for (neighborRow = -1; neighborRow <= 1; neighborRow++) {
					checkRow = row + neighborRow;
					for (neighborCol = -1; neighborCol <= 1; neighborCol++) {
						checkCol = col + neighborCol;
						if (this.validPosition(checkRow, checkCol)) {
							if (this.board[checkRow][checkCol].isBomb) {
								this.board[row][col].bombsAround += 1;
							}
						}
					}
				}

			}
		}
	}

	display(){
		const visibleTile = '0';
		const invisibleTile = '#';
		const bombTile = '*';
		this.boardOutput = '   0 1 2 3 4 5 6 7 8 9\n';
		var row, col;

//Sample Output
//    0  1 2 3 4 5 6 7 8 9
// 0 # # # # # # # # # #
// 1 # # # # # # # # # #
// 2 # # # # # # # # # #
// 3 # # # # # # # # # #
// 4 # # # # # # # # # #
// 5 # # # # # # # # # #
// 6 # # # # # # # # # #
// 7 # # # # # # # # # #
// 8 # # # # # # # # # #
// 9 # # # # # # # # # #

		for (row = 0; row < 10; row++) {
			this.boardOutput += row;
			for (col = 0; col < 10; col++) {
				this.boardOutput += this.displayTile(this.board[row][col]);
			}
		}
		return this.boardOutput;
	}

	displayTile (tile) {
		var output = ''; 

		if (tile.isVisible || this.visibleBoard) {
			output = (' ' + tile.bombsAround);
		} else {
			output = ' #'
		}

		if (tile.isBomb && this.visibleBoard && this.visibleBoard) {
			output = ' *';
		}
		if (tile.col == (this.boardSize - 1)) {
			output += '\n';
		}

		return output;
	}

	play(row, col) {
		if (this.validPosition(row, col)) {
			this.update(row, col)
			return true;
		}
		return false;
	}

	update(row, col) {
		var stack = [];
		stack.push(this.board[row][col])

		while (stack.length) {
			var cursor = stack.pop()
			cursor.isVisible = true;

			this.availableSpaces -= 1;

			if (cursor.bombsAround == 0) {
				var neighborRow, neighborCol, checkRow, checkCol;

				for (neighborRow = -1; neighborRow <= 1; neighborRow++) {
					checkRow = cursor.row + neighborRow;
					for (neighborCol = -1; neighborCol <= 1; neighborCol++) {
						checkCol = cursor.col + neighborCol;
						
						if (this.validPosition(checkRow, checkCol)) {
							var neighborTile = this.board[checkRow][checkCol];
							if ((!neighborTile.isVisible) && (!neighborTile.isBomb)) {
								stack.push(neighborTile);
							}
						}

					}
				}
			}


		}
	}

	validPosition(row, col) {
		if ((row < 0 || col < 0) || (row >= this.boardSize || col >= this.boardSize)) {
			return false;
		}
		return true;
	}

	reset() {
		this.board = [];
		this.boardOutput = '';
		this.visibleBoard = false;
		this.availableSpaces = 0;
		this.boardSize = 10;

		var row, col, neighborRow, neighborCol, checkRow, checkCol;

		for (row = 0; row < 10; row++) {
			var newRow = [];
			for (col = 0; col < 10; col++) {
				var newTile = new Tile(row, col);
				if ((Math.floor(Math.random() * 100)) <= 15){
                    newTile.isBomb = true;
                } else {
                	this.availableSpaces += 1;
                }
                newRow.push(newTile);
			}
			this.board.push(newRow)
		}

		for (row = 0; row < 10; row++) {
			for (col = 0; col < 10; col++) {

				for (neighborRow = -1; neighborRow <= 1; neighborRow++) {
					checkRow = row + neighborRow;
					for (neighborCol = -1; neighborCol <= 1; neighborCol++) {
						checkCol = col + neighborCol;
						if (this.validPosition(checkRow, checkCol)) {
							if (this.board[checkRow][checkCol].isBomb) {
								this.board[row][col].bombsAround += 1;
							}
						}
					}
				}

			}
		}
	}

	win() {
		if (this.availableSpaces == 0) {
			this.visibleBoard = true;
			return true;
		}
		return false;
	}

	touchedMine(row, col) {
		if (this.board[row][col].isBomb) {
			this.visibleBoard = true;
			return true;
		}
		return false;
	}

}

class Tweet {
	constructor(user_str, user_id, play) {
		this.user_str = user_str;
		this.user_id = user_id;
		this.play = play;
	}
}

//Setup
var Twit = require('twit');
var config = require('./config.js')
var T = new Twit(config);
var game = new Minesweeper();
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
	
	setTimeout(endStream, 30000);

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
	setTimeout(getReplys, 5000);
}
//Every Day!!
//setInterval(main, 300000);
main();

