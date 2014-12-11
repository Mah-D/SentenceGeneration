"use strict"
var rndSentence = function (grammar, start) {
	var i = Math.floor(Math.random() * grammar[start].length );
	var prod = grammar[start][i];
	var sentence = "";
	for(var j in prod) {
		if(grammar[prod[j]]) {
			// nonterminal
			sentence += rndSentence(grammar, prod[j]);
		} else {
			// terminal
			sentence += prod[j] + ' ';
		}
	}
	return sentence;
}

module.exports.random = rndSentence;
