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

export default class Minesweeper;







