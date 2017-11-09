var inquirer = require('inquirer');
var fs = require('fs');

var word = null;



class Word{
	initializer(Word)
	{
		this.word = word.trim();
		this.length = word.trim().length;
		this.wordarray = word.split('');
		this.letters = ((a)=>{
							let arr = _.filter(a, n => n != ' ');
							arr = _.uniq(arr);
							
		})
	}
}




class Game {
	// Initialize new game, and sets the variables
	initializer(){
		this.turns = 10;
		this.round = 0;
		this.current_word = null;
		this.guessedLetters = [];
		this.words = [];
		this.selectedWord = [];
		console.log("initializer")
	}

	mainMenu(){
		console.log("mainMenu")

	}

	getWords(file = 'words.txt'){
		console.log("getWords")
		return new Promise((resolve, reject) => {
			fs.readFile(file, 'utf8', (err,data) =>{
				if (err) reject(Error("File Type Not Recognized"));

				if (data != null)
						resolve(data.split('\r\n'));
				else
					reject(Error("File Empty"))
			})
		}).then(a => {
			a.forEach(v => this.words.push(new Word(v)));
		}), e => {console.log(e)}
	}


	chooseWord(){
		let r = Math.floor(Math.random()*(this.words.length));
		this.current_word = this.words[r];
	}



}

var game = new Game();