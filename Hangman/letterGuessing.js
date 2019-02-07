
///////////////////////////////////////////////////
//RUNS IN TERMINAL WITH NODE, USE node <filename>//
///////////////////////////////////////////////////

var word = {};
var resultString = [];
var resultCount = 0;
var usedLetters = {};

function defineWord(inputWord) {
	if (inputWord.length > 1) {
		for(i = 0; i < inputWord.length; ++i) {
			var letter = inputWord[i].toUpperCase();

			if (word[letter]) {
				console.log(word);
				word[letter].push(i);
			} else {
				word[letter] = [i];
			}
			resultString.push("_");
			resultCount += 1;
		}
		return true;
	} else {
		return false;
	}
}

function guessLetter(letter) {
	var indexArray = word[letter]
	if (indexArray) {
		if (usedLetters[letter]) {
			console.log("You already used that letter...");
		} else {
			usedLetters[letter] = true;
			console.log("Correct Guess!");
			for (i = 0; i < indexArray.length; ++i) {
				resultString[indexArray[i]] = letter;
				resultCount -= 1;
			}
		}

		console.log(resultString);
		return true;
	}
	console.log("Sorry, Incorrect Guess, Try Again");
	return false;
}

function main() {
	var guesses = 7;
	var guessesLeft = guesses;

	const readline = require('readline');

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
		prompt: 'Choose a letter: '
	});

	console.log("You can type (exit) to leave at any time! Good Luck!");
	console.log("Enter a word to guess: ");

	rl.on('line', (input) => {
		if (input == "exit") {
			rl.close();
		}

		if (guessesLeft == 0) {
			console.log("Enter another word to guess: ");
			word = {};
			usedLetters = {};
			resultString = [];
			guesses = 7;
			guessesLeft = guesses;
			console.log("Enter another word to guess: ");
		}

		if (guessesLeft < guesses) {
			if (input.length > 1) {
				console.log("Please enter one letter.");

			} else if (input.toLowerCase() == input.toUpperCase()) {
				console.log("Please enter a letter.");

			} else {
				var correct = guessLetter(input.toUpperCase());
				if (!correct) {
					--guessesLeft;
					console.log("You have " + guessesLeft + " attempts left!");
				}
			}
		}

		if (guessesLeft == guesses) {
			if (input.toLowerCase() != input.toUpperCase()) {
				defineWord(input);
				--guessesLeft;
			} else {
				console.log("Please enter a word of letters: ");
			}
		}

		if (resultCount <= 0) {
			console.log("Congratulations you win!");
			word = {};
			usedLetters = {};
			resultString = [];
			guesses = 7;
			guessesLeft = guesses;
			console.log("Enter another word to guess: ");
		} else {
			rl.prompt();
		}

	}).on('close', () => {
		console.log('\nThanks for Playing, Goodbye!\n');
		process.exit(0);
	});
}

main();

// Bonus: Make it like Hangman:
// Keep track of all the guessed letters (right and wrong) and only let the user guess a letter once. If they guess a
// letter twice, do nothing.
// Keep track of the state of the hangman as a number (starting at 0), and subtract or add to that number every time
// they make a wrong guess.
// Once the number reaches 6 (a reasonable number of body parts for a hangman), inform the user that they lost and show
// a hangman on the log.

// var word = {};
// var resultString = [];
// var resultCount = 0;
// var guesses = 7;
// var guessesLeft = guesses;


// const readline = require('readline');

// function renderHangman() {

// }

// function defineWord(passedRL) {
// 	const rl = passedRL;
// 	console.log("defineWord");

// 	rl.on('line', (input) => {
// 		console.log("defineWord line");
// 		console.log("Enter a word to guess: ");

// 		if (input == "exit") {
// 			rl.close();
// 		}

// 		if (input.toLowerCase() != input.toUpperCase()) {
// 			if (input.length > 0) {
// 				for(i = 0; i < input.length; ++i) {
// 					const letter = input[i].toUpperCase();

// 					if (word[letter]) {
// 						word[letter].push(i);
// 					} else {
// 						word[letter] = [i];
// 					}
				
// 					resultString.push("_");
// 					resultCount += 1;

// 				}
// 			}
// 		} else {
// 			console.log("Please enter a word of letters...");
// 		}
// 	}).on('close', () => {
// 		console.log('\nThanks for Playing, Goodbye!\n');
// 		process.exit(0);
// 	});

// }

// function guessLetter(letter) {
// 	console.log("guessLetter");
// 	var indexArray = word[letter]

// 	if (guessesLeft < guesses) {
// 		if (input.length > 1) {
// 			console.log("Please enter one letter.");

// 		} else if (input.toLowerCase() == input.toUpperCase()) {
// 			console.log("Please enter a letter.");

// 		} else {
// 			if (indexArray == "ITS BEEN USED") {
// 				console.log("You already used that letter...");

// 			} else if(indexArray) {
// 				console.log("Correct Guess!");
// 				word[letter] = "ITS BEEN USED";

// 				for (i = 0; i < indexArray.length; ++i) {
// 					resultString[indexArray[i]] = letter;
// 					resultCount -= 1;
// 				}

// 				console.log(resultString);
// 			} else {
// 				console.log("Sorry, Incorrect Guess, Try Again");
// 				--guessesLeft;
// 				console.log("You have " + guessesLeft + " attempts left!");
// 			}
// 		}
// 	}
// }

// function reset() {
// 	word = {};
// 	usedLetters = {};
// 	resultString = '';
// 	guessesLeft = guesses;
// }

// function main() {
	
// 	const rl = readline.createInterface({
// 		input: process.stdin,
// 		output: process.stdout
// 	});

// 	console.log("You can type (exit) to leave at any time! Good Luck!");
// 	defineWord(rl);

// 	rl.on('line', (input) => {
// 		if (input == "exit") {
// 			rl.close();
// 		}

// 		if (guessesLeft == 0) {
// 			console.log("guessesLeft = 0");
// 			console.log("Sorry your guesses have been exhausted, Play Again?");
// 			reset();
// 			defineWord(rl);
// 		}

// 		if (resultCount <= 0) {
// 			console.log("Win");
// 			console.log("Congratulations you win! Play Again?");
// 			reset();
// 			defineWord(rl);
// 		}

// 		rl.prompt();
// 		guessLetter(input);

// 	}).on('close', () => {
// 		console.log('\nThanks for Playing, Goodbye!\n');
// 		process.exit(0);
// 	});
// }

// main();
