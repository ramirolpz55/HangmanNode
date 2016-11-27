//word.js SHOULD BE A CONSTRUCTOR FILE 
//word.js SHOULD CONTAIN ALL OF THE METHODS WHICH WILL CHECK LETTERS GUESSED VERSUS THE RANDOM WORD SELECTED.

//THIS WILL REQUIRE THE "letter.js" FILE TO BE USED. 
var Letter = require('./letter.js');

//THIS IS MY CONSTRUCTOR FUNCTION WHICH HANDLES THE TRYLEFT AND TAKES IN CHOSEN WORD 
//ALSO HOLDS IN THE GUESSES AND THE LETTERS AS WELL
var Word = function(chosenWord) {
    this.trysLeft = 10;
    this.chosenWord = chosenWord;
    this.letters = [];
    this.guesses = [];
    for (var i = 0; i < this.chosenWord.length; i++) {
        this.letters.push(new Letter.Letter(this.chosenWord[i]));
    }
};

//THIS IS MY PROTYPE WHICH IS GOING TO CHECK THE LETTERS BEING PASSED THROUGH 
//ALSO UPDATES THE TRYSLEFT IF A LETTER IS NOT VALID 
Word.prototype.checkLetter = function(letter) {
    this.notCorrect = true;
    this.isLetterValid = false;
    var letter = letter.toLowerCase();
    if (this.guesses.indexOf(letter) != -1) {
        this.isLetterValid = true;
    } else {
        this.guesses.push(letter);
        for (var i = 0; i < this.letters.length; i++) {
            if (this.letters[i].letter.toLowerCase() == letter) {
                this.notCorrect = false;
                this.letters[i].show = true;
            }
        }
        if (this.notCorrect) {
            this.trysLeft--;
        }
    }
};

//THIS IS MY PROTOYPE WHICH RUNS A FUNCTION WHICH CHECKS TO SEE IF IS COMPLETE AND RETURNS FALSE OR TRUE.
Word.prototype.isComplete = function() {
    for (var i = 0; i < this.letters.length; i++) {
        if (!this.letters[i].show) {
            return false;;
        }
    }
    return true;
};

//THIS FUNCTION WILL PRINT THE OUTPUT
Word.prototype.print = function() {
    var output = "";
    for (var i = 0; i < this.letters.length; i++) {
        output += this.letters[i].printLetra();
    }
    return output;
};

//THIS IS THE MODULE EXPORTS WHICH WILL TAKE MY WORD FUNCTION AND EXPORT IT. 
module.exports = {
    Word
};
