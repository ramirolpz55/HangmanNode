//letter.js SHOULD BE A CONSTRUCTOR FILE.
//letter.js SHOULD CONTROL WETHER OR NOT A LETTER APPEARS AS A "_" OR AS ITSELF ON-SCREEN.

//console.log("RAMIRO THIS IS LETTER");

//THIS IS A PROTOYPE WHICH PRINTS THE LETTER IF IT IS CORRECTLY GUESSED IF NOT IT WILL HAVE A * 
Letter.prototype.printLetra = function() {
    if (this.show) {
        return this.letter;
    } else {
        return '-';
    }
};

//THIS FUNCTION TAKES IN A LETTER AND COMPARES IT TO A BLANK SPACE == " "
function Letter(letter) {
    this.letter = letter;
    if (this.letter == ' ') {
        this.show = true;
    } else {
        this.show = false;
    }
}


//THIS WILL EXPORT THE FUNCTION "Letter" TO THE FILE INQUIRING IT

module.exports = {
    Letter
};
