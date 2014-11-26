"use strict"

var grammar = {
	
	'expr' : [['term', '-' ,'expr'],['term', '+' ,'expr'],['term']],
	'term': [['factor', '*', 'term'],['factor', '/', 'term'],['factor']],
	'factor' : [['ID'],['NUM']]
	
	
	
	//'S': [['S', 'S', 'S'],['a']]
	/*
	'S' : [['NP', 'VP']],
	'NP' : [['Det', 'N'], ['I'], ['he'], ['she'], ['joe']],
	'VP' : [['V', 'NP']],
	'Det' : [['a'], ['the'], ['my'], ['his']],
	'N' : [['elephant'], ['cat'], ['jeans'], ['suit']],
	'V' : [['kicked'], ['followed'], ['shot']]
	*/
}


function rndSentence(start) {
	var i = Math.floor(Math.random() * grammar[start].length );
	var prod = grammar[start][i];
	var sentence = "";
	for(var j in prod) {
		if(grammar[prod[j]]) {
			// nonterminal
			sentence += rndSentence(prod[j]);
		} else {
			// terminal
			sentence += prod[j] + ' ';
		}
	}
	//console.log("start: " + sentence);
	return sentence;
}

for (var ctr = 0; ctr < 10 ;  ctr++){
    console.log(ctr + rndSentence('expr'));

}