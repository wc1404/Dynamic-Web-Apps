//////////////////////////////////////////////////////////
//RUNS IN TERMINAL WITH NODE, PLEASE USE node <filename>//
//////////////////////////////////////////////////////////

//Object Class for hangman Drawing
function HangMan() {
	this.hangmanParts = { 
		"head":[" ----- ", "| - - |", "|  |  |", "| --- |", " ----- "],
		"body":["|","|","|","|","|"],
		"armL":["-----"],
		"armR":["-----"],
		"legL":["   |","  | "," |  ","|   ",],
		"legR":["|   "," |  ","  | ","   |",]
	}

	this.hangmanPos = { 
		"head":[3,10],
		"body":[8,13],
		"armL":[10,8], 
		"armR":[10,14],
		"legL":[13,9],
		"legR":[13,14]
	}

	this.board = [
		["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", " ", " ", " ", " "],
		[" ", "|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|", " ", " ", " ", " ", " "],
		[" ", "|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|", " ", " ", " ", " ", " "],
		[" ", "|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
		[" ", "|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
		[" ", "|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
		[" ", "|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
		[" ", "|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
		[" ", "|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
		[" ", "|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
		[" ", "|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
		[" ", "|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
		[" ", "|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
		[" ", "|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
		[" ", "|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
		[" ", "|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
		[" ", "|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
		[" ", "|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
		[" ", "|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
		["-", "-", "-", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "] 
	];

	this.renderableBoard = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];

	//Makes the board into an easily printable arra
	this.concatenateBoard = function() {
		for (var i = 0; i < this.board.length; ++i) {
			this.renderableBoard[i] = "";
			for (var j = 0; j < this.board[0].length; ++j) {
				this.renderableBoard[i] += this.board[i][j];
			}
		}
	}

	//Adds a hangman Part to the board according to number of errors
	this.renderPart = function(partNo) {
		var parts = ["head", "body", "armL", "armR", "legL", "legR"]
		
		if (partNo >= parts.length) {
			throw "partNo invalid, cannot draw parts that do not exist...";
		}

		// console.log("Preparing...")
		var part = parts[partNo];
		// console.log("About to draw "+ part);
		var hangmanPart = this.hangmanParts[part];
		// console.log("Looks Like: "+ hangmanPart);
		var origin = this.hangmanPos[part];
		// console.log("Starting At Board Space Origin"+ origin);
		var cursor = [origin[0], origin[1]];
		// console.log("Cursor Set to: "+ cursor);
		// console.log("\nPreparations Complete!\n")
		// console.log("Drawing...");
		for (var i = 0; i < hangmanPart.length; ++i) {
			for (var j = 0; j < hangmanPart[0].length; ++j) {
				// console.log("Drawing "+ hangmanPart[i][j] +" at: i:"+ cursor[0] +", j: "+ cursor[1] +" From Hangman Position: i: " + i + ", j: " + j);
				this.board[cursor[0]][cursor[1]] = hangmanPart[i][j];
				cursor[1] += 1;
			}
			cursor[0] += 1
			cursor[1] = origin[1];
		}
		// console.log("\nDrawing Complete!\n")
		// console.log("Concatenating Board...")
		this.concatenateBoard();//Add to the result Array for output
	}
};

//Object class for actual game
function HangmanGame(guesses) {
	this.startGame = false;
	this.guesses = guesses;
	this.word = {};
	this.result = [];
	this.resultCount = 0;
	this.guessesLeft = guesses;
	this.hangMan = new HangMan();

	//Populates a dictionary with the word that was input
	this.defineWord = function(input) {
		// console.log("defining Word...")
		if (/^[a-zA-Z]+$/.test(input)) {//Check that array is a word of letters only
			for(i = 0; i < input.length; ++i) {
				//Converts all letters to uppercase to avoid edge case of Lower V. Upper case letter handling
				const letter = input[i].toUpperCase();

				if (this.word[letter]) {
					this.word[letter].push(i);
				} else {
					this.word[letter] = [i];
				}
			
				this.result.push("_");
				this.resultCount += 1;
			}
			this.startGame = true;
			// console.log("Word Defined!");
			// console.log(this.word);
			// console.log(this.result);
			// console.log(this.resultCount);
		} else {
			console.log("Please enter a word of letters...");
		}
	}

	//Guesses Letter based on input
	this.guessLetter = function(input) {
		// console.log("Guessing Letter...")
		console.log("\n");

		if (input.length > 1) {//Checks for length of input to see if it is a letter
			console.log("Please enter one letter.");

		} else if (!/^[a-zA-Z]+$/.test(input)) {//Tests that input is a letter
			console.log("Please enter a letter.");

		} else {
			//Get array associated with the word input
			var indexArray = this.word[input]

			if (indexArray == "ITS BEEN USED") {//Check if input has been used before
				console.log("You already used that letter...");

			} else if(indexArray) {//The letter exists in the word and hasn't been used
				console.log("Correct Guess!");
				this.word[input] = "ITS BEEN USED";//Set Used Flag

				//for every letter in the word take away the result count for game mechanics
				for (i = 0; i < indexArray.length; ++i) {
					this.result[indexArray[i]] = input;
					this.resultCount -= 1;
				}
			//the letter is not in the word, subtract from the guesses left, render a hangman part and display the number of guesses left
			} else {
				console.log("Sorry, Incorrect Guess");
				--this.guessesLeft;
				this.hangMan.renderPart((this.guesses - this.guessesLeft)-1);
				console.log("You have " + this.guessesLeft + " attempts left!");
				if (this.guessesLeft == 0) {//If all Guesses have been exhausted reveal all the letters
					console.log("The Answer Was: ")
					for (const [key, value] of Object.entries(this.word)) {
						if (value != "ITS BEEN USED") {
			  				for (i = 0; i < value.length; ++i) {
			  					this.result[value[i]] = key;
							}
						}
					}
				}
			}
			console.log(this.result);//Print out the results so far
		}
	}
}

function main() {

	//Since I'm using node I need a readline
	const readline = require('readline');
	
	//Create Readline instance
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	const guessAmt = 6;//Constant to set the amount of guesses I want to give

	//Create game and concatenate so that I can print an empty 
	var game = new HangmanGame(guessAmt);
	game.hangMan.concatenateBoard();

	console.log("You can type (exit) to leave, or type (restart) to restart at any time! Good Luck!");
	console.log("Please enter a word to guess: ");
	
	rl.stdoutMuted = true;//hide the output
	//Set the output to hide word as you type it
	rl._writeToOutput = function _writeToOutput(input) {
		if (rl.stdoutMuted) { rl.output.write("*"); }
		else { rl.output.write(input); }
	};

	//Start reading input
	rl.on('line', (input) => {
		if (game.startGame && input != "exit" && input != "restart") {//Game has started, guess letter
			game.guessLetter(input.toUpperCase());
		}


		if (!game.startGame) {//Game has not started, define a new word
			game.defineWord(input);
			console.log("\n");
			rl.stdoutMuted = false;//show output again

		} else if (game.guessesLeft == 0) {//You have lost, create a new game
			console.log("Sorry your guesses have been exhausted, Let's Play Again!!");
			game = new HangmanGame(guessAmt);
			game.hangMan.concatenateBoard();
			console.log("Enter another word to guess: ");
			rl.stdoutMuted = true;//hide output

		} else if (game.resultCount <= 0) {//Player has won, create a new game
			console.log(game.resultCount)
			console.log("Congratulations you win! Let's Play Again!!");
			game = new HangmanGame(guessAmt);
			game.hangMan.concatenateBoard();
			console.log("Enter another word to guess: ");
			rl.stdoutMuted = true;//hide output
		}

		if (input == "exit") {//Player wants to leave, Close the readline I/O
			rl.close();
		} else if (input == "restart") { //Player wants to restart, Create a new Game
			console.log("Restarting...\n");;
			game = new HangmanGame(guessAmt);
			game.hangMan.concatenateBoard();
			console.log("Enter another word to guess: ");
			rl.stdoutMuted = true;//Hide output
		} else if (game.startGame) {//Game is ongoing, render board and ask for another letter
			var boardState = game.hangMan.renderableBoard;
			console.log(boardState);
			console.log("\nChoose a letter: ");
		}

	}).on('close', () => {//Game session was closed, Give thanks and say Bye!!
		console.log('\nThanks for Playing, Goodbye!\n');
		process.exit(0);
	});
}

main();//Call main to start the game
