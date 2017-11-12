var inquirer = require("inquirer");
var chalk = require("chalk");
var Word = require("./Word");
var words = require("./words");

function Game() {

	var self = this;

	this.start = function() {
		this.guesses = 20;
		this.getWord();
	};

	this.getWord = function() {
		var selectWord = words[Math.floor(Math.random() * words.length)];
		this.currentWord = new Word(selectWord);
		console.log('\n' + this.currentWord + '\n');
		this.makeGuess();
		console.log(selectWord);
	};

	this.makeGuess = function() {
		this.askForLetter().then(function() {
			if (self.guesses < 1) {
				console.log(
					"Out of Guesses! Word was: \"" + self.currentWord.getSolution() + "\"\n"
				);
				self.askToPlayAgain();
			}
			else if (self.currentWord.guessedCorrectly()) {
				console.log("Great Success! Next Word");
				self.guesses = 20;
				self.getWord();
			}
			else {
				self.makeGuess();
			}
		});
	};

	this.askToPlayAgain = function() {
		inquirer
			.prompt([
				{
					type: "confirm",
					name: "choice",
					message: "Play Again?"
				}
				])
				.then(function(val) {
					if(val.choice) {
						self.start();
					} else {
						self.quit();
					}
				});
	};

	  this.askForLetter = function() {
    return inquirer
      .prompt([
        {
          type: "input",
          name: "choice",
          message: "Guess a letter!",
          validate: function(val) {
            return /[a-z1-9]/gi.test(val);
          }
        }
      ])
      .then(function(val) {
        var didGuessCorrectly = self.currentWord.guessLetter(val.choice);
        if (didGuessCorrectly) {
          console.log(chalk.green("\nCORRECT!!!\n"));

        }
        else {
          self.guesses--;
          console.log(chalk.red("\nINCORRECT!!!\n"));
          console.log(self.guesses + " guesses remaining!!!\n");
        }
      });
  };

  this.quit = function() {
    console.log("\nGoodbye!");
    process.exit(0);
  };
}

module.exports = Game;