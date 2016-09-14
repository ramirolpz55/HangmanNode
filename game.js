//game.js FILE WILL RANDOMLY SELECT A WORD FOR THE PLAYER WHICH I USED TWO CATEGORIES.

//PUT THIS SO I CAN SEE FILE IS EXPORTING
//console.log("game.js is loaded");

//THIS ARE THE NODE MODULES THAT ARE NEEDED
var MovieDB = require('moviedb')('6733df4b76abb7884b0195f630afb642');
var inquirer = require('inquirer');

//THIS FUNCTION TAKES IN THE USERPROMPT WHICH ASKS THEM TO TYPE IN THEIR FAVORITE ACTOR 
function userPrompt(cb) {
    inquirer.prompt([{
        //THIS IS MY PROMPT WHICH WILL BE THE FIRST THIS THE USER SEES UPON INITIATING THE GAME. 
        type: 'input',
        message: 'Please type in ONLY the first name of your favorite Actor please.',
        name: 'actor'
    }]).then(function(user) {
        var actor = user.actor;
        getActorId(actor, function(actorID) {
            getMovies(actorID, function() {
                cb();
            });
        });
    });
}



//THIS MAKES THE CALL TO THEMOVIEDB.ORG DATABASE TO GET THE MOVIE INFROMATION THAT WILL BE USED FOR THE GAME.
function getMovies(actorID, cb) {
    var moviesArr = [];
    MovieDB.discoverMovie({ with_cast: actorID }, function(err, res) {
        if (err) {
            console.log('I apologize, but we are having some type of problem at this time!');
            return;
        }
        var results = res.results;
        for (var i = 0; i < results.length; i++) {
            var title = results[i].title;
            //THIS RULE HERE WILL EXCLUDE ANY TITLE WITH THESE TYPES OF CHARACTERS.
            if (/^[a-zA-Z ]*$/g.test(title)) {
                moviesArr.push(title);
            }
        }
        var randomNumber = Math.floor(Math.random() * moviesArr.length);
        randomNumber -= 1;
        var chosenWord = moviesArr[randomNumber];
        module.exports.chosenWord = chosenWord;
        cb();
    });
}

//THIS MAKES THE CALL TO THEMOVIEDB.ORG DATABASE TO GET THE ACTOR INFROMATION THAT WILL BE USED FOR THE GAME.
function getActorId(actor, cb) {
    MovieDB.searchPerson({ query: actor }, function(err, res) {
        if (err) {
            //ADDED ERROR HANDLING JUS IN CASE AN ERROR OCCURS 
            console.log('I apologize, but we are having some type of problem at this time!');
            return;
        }
        if (res.results.length > 0) {
            var actorID = res.results[0].id;
            cb(actorID);
        } else {
            console.log('That actor is either not in our database or you are messing with me. Which one is it?');
        }
    });
}

//EXPORTS THE USERPROMPT FOR THE OTHER FILES TO USE. 
module.exports = {
    userPrompt
};