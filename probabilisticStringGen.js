"use strict"

var grammar = {
	 
	'expr' : [['term'], ['term', '-' ,'expr'],['term', '+' ,'expr']],
	'term': [['factor'], ['factor', '*', 'term'],['factor', '/', 'term']],
	'factor' : [['ID'],['NUM'], ['(', 'expr', ')']],	
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
function isProdExhausted(rule, prod) {	return markers[JSON.stringify([rule,prod])];
}
function isRuleExhausted(rule) {
	return markers[rule]
}
function markTermExhausted(rule,prod,term) {
	markers[JSON.stringify([rule,prod,term])] = true;
}
function markProdExhausted(rule,prod){
	markers[JSON.stringify([rule,prod])] = true;
	markers['hey']="yo"
	for(var i = 0; i < grammar[rule].length; i++) {
		if(!isProdExhausted(rule,i)) return;
	}
	markRuleExhausted(rule);
}
function markRuleExhausted(rule) {
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
        if(nonterms[s] && examples.hasOwnProperty(s)) {
          // current path is already exploring s, don't need to
          // explore it again. if we have an example, use it.
          out += examples[s];
        } else {
				  out += gen(s,nonterms);
        }
				if(!isRuleExhausted(s) && !nonterms[s]) { 
          allExhausted = false; 
        }
			} else {
				// terminal
				out += s;
			}
		}
		if(allExhausted) { markProdExhausted(start,prod); }
		if(!examples.hasOwnProperty(start)) { 
      examples[start] = out; 
    }
  } else {
		out = examples[start];
  }

  delete nonterms[start];
  return out;
}

var start='expr';
while(!isRuleExhausted(start))
  console.log('result = ' + gen(start,{}))
