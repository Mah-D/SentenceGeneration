SentenceGeneration
==================
While ago we were interested in generating random [PEG] (http://en.wikipedia.org/wiki/Parsing_expression_grammar) sentences. This made us try a few experiments on CFG sentence generation too. 
[randomStringGen.js] (https://github.com/Mah-D/SentenceGeneration/blob/master/randomStringGen.js) is a tiny library that receives a CFG grammar and the _start_ state, and generates random sentences. Look [main.js] (https://github.com/Mah-D/SentenceGeneration/blob/master/main.js) to see how to use it.

###When odds are against you###
Suppose the given grammar is _S ::= S S S S | a_ using random techniques can cause stack memory overflow. (Assigmnet: why?). To solve this problem, production rule selection should converge. [ConvergentStringGen.js]() is a library that guarantees each production rule should at least be visited once. 
