var gen  = require('./randomStringGen.js');

var grammar = {
	'expr' : [['term', '-' ,'expr'],['term', '+' ,'expr'],['term']],
	'term': [['factor', '*', 'term'],['factor', '/', 'term'],['factor']],
	'factor' : [['ID'],['NUM']]
}

for (var ctr = 0; ctr < 10 ;  ctr++){
    console.log( gen.random(grammar, 'expr'));
}