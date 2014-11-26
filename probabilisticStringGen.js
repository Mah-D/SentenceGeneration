"use strict"

var grammar = {
	/* 
	'expr' : [['term'], ['term', '-' ,'expr'],['term', '+' ,'expr']],
	'term': [['factor'], ['factor', '*', 'term'],['factor', '/', 'term']],
	'factor' : [['ID'],['NUM'], ['(', 'expr', ')']],
	//	*/
	
	 
	'S':[['A'],['B']],
	'A':[['1'],['2']],
	'B':[['3'],['4']]
	// */
	/*	
	'S':[['A'],['B']],
	'A':[['x'],['y']],
	'B' :[['z']]
	*/
	//'S': [['S', 'S', 'S','a', 'S'],['a']]
	//'S': [['S','a'],['S','a'],['S','a'],['S','a'],['S','a'],['S','a'],['S','a'],['S','a'],['S','a'],['a']]
	//'S': [['S', 'S', 'S'],['S', 'S', 'S'],['S', 'S', 'S'],['S', 'S', 'S'],['S', 'S', 'S'],['a']]
	//'S': [['S', 'S'],['S', 'S'],['S', 'S'],['S', 'S'],['S', 'S'],['S', 'S'],['S', 'S'],['S', 'S'],['S', 'S'],['a']]
	//'S': [['(', 'S', ')'],['a']]
	//'S': [['S', 'S', 'S','S','S','S','S','S','S','a'],['a']]
	/*
	'S' : [['NP', 'VP']],
	'NP' : [['Det', 'N'], ['I'], ['he'], ['she'], ['joe']],
	'VP' : [['V', 'NP']],
	'Det' : [['a'], ['the'], ['my'], ['his']],
	'N' : [['elephant'], ['cat'], ['jeans'], ['suit']],
	'V' : [['kicked'], ['followed'], ['shot']]
	*/
	
}
var examples = {};

//Data
var markers = {};
//Predicate to check if ith prod is marked or not!
function marked(start, i) {
	if(markers[start] === undefined) {
		markers[start] = [];
		return false;
	}
	if(markers[start][i] === undefined)
	    return false;
	else return true;
}


function isTermExhausted (rule, prod, term){
	return markers[JSON.stringify([rule,prod,term])]
}
function isProdExhausted(rule, prod) {
	console.log("isProdExhausted(" + JSON.stringify([rule,prod]) + ") = " + 	markers[JSON.stringify([rule,prod])]);
	return markers[JSON.stringify([rule,prod])];
}
function isRuleExhausted(rule) {
	return markers[rule]
}
function markTermExhausted(rule,prod,term) {
	markers[JSON.stringify([rule,prod,term])] = true;
}
function markProdExhausted(rule,prod){
	console.log("markProdExhausted(" + JSON.stringify([rule,prod]) + ")");
	markers[JSON.stringify([rule,prod])] = true;
	markers['hey']="yo"
	console.log(JSON.stringify([rule,prod]))
	console.log(JSON.stringify(markers));
	for(var i = 0; i < grammar[rule].length; i++) {
		console.log("exhausted(" + JSON.stringify([rule,i]) + ") = " + isProdExhausted(rule,i))
		if(!isProdExhausted(rule,i)) return;
		console.log("prod " + JSON.stringify([rule,prod]) + " is exhausted")
	}
	markRuleExhausted(rule);
}
function markRuleExhausted(rule) {
	console.log("markRuleExhausted(" + rule + ")");
	markers[rule] = true;
}

// To Mark a prod!
function mark(start,i) {
	if(markers[start] === undefined) markers[start] = [];
	markers[start][i] = true;
}

function findUnExhaustedProduction(start) {
	// return a production for start that is unseen, or undefined if covered.
	for(var i = 0; i < grammar[start].length; i++) {
		if(!isProdExhausted(start,i)) {
			return i;
		}
	}
	
	return undefined;
}

function gen(start,nonterms){
	console.log('gen ' + start);
	if(isRuleExhausted(start))
		return examples[start];
	var prod = findUnExhaustedProduction(start);

  // record presence of start nonterminal in the path.
  nonterms[start]=true;
	var out="";

  if(prod !== undefined) {

		var allExhausted = true;
		for(var i = 0; i < grammar[start][prod].length; i++) {
			var s = grammar[start][prod][i];
			if(grammar[s]) {
				// nonterminal
        console.log('nonterms = ' + JSON.stringify(nonterms));
        console.log('examples = ' + JSON.stringify(examples));
        if(nonterms[s] && examples.hasOwnProperty(s)) {
          // current path is already exploring s, don't need to
          // explore it again. if we have an example, use it.
          console.log("using example["+s+"]="+examples[s]);
          out += examples[s];
        } else {
				  out += gen(s,nonterms);
        }
        console.log('isRuleExhausted(s) = ' + isRuleExhausted(s));
        console.log('nonterms = ' + JSON.stringify(nonterms));
				if(!isRuleExhausted(s) && !nonterms[s]) { 
          // we should keep exploring this production in
          // case this is the only way to explore s
          allExhausted = false; 
        }
				/*
				if(examples[start]) out += examples[start];
				else 				out += gen(s);
				*/
			} else {
				// terminal
				out += s;
			}
		}
		console.log("allExhausted " + JSON.stringify([start,prod]) + " = " + allExhausted);
		if(allExhausted) { markProdExhausted(start,prod); }
    console.log("save example for " + start + "? examples = " + JSON.stringify(examples));
		if(!examples.hasOwnProperty(start)) { 
      console.log("saving example for " +start + ": " + out);
      examples[start] = out; 
    }
  } else {
		out = examples[start];
  }

  delete nonterms[start];
  return out;
}

var start='S';
while(!isRuleExhausted(start))
  console.log('result = ' + gen(start,{}))
