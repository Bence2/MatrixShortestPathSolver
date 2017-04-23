'use strict'

const _ = require('underscore');
const main = require('./main');

// normal esetben nem csak a fo megoldo metodust tesztelnem, hanem a helper metodusokat is
// de az idoben nem fert volna bele
// tovabba pure js-ben meg soha nem irtam tesztet, (angular-hoz igen), igy ez elegge takolmany lett
// fura, h nincs assert, szoval ezt biztosan finomitani kene

var inputString = '4,3,1,1,4,3,10,12,3,0,45,3,4,5,6,6,5,45';
var solutionPath = main.solveMatrix(inputString);
console.log(true === _.isEqual([ { x: 1, y: 1 },
            { x: 2, y: 1 },
            { x: 3, y: 1 },
            { x: 3, y: 2 },
            { x: 4, y: 2 },
            { x: 4, y: 3 } ],
            solutionPath));

var inputString = '4,3,1,3,4,3,10,12,3,0,45,3,4,5,6,6,5,45';
var solutionPath = main.solveMatrix(inputString);
console.log(true === _.isEqual([ 
            { x: 1, y: 3 },
            { x: 2, y: 3 },
            { x: 3, y: 3 },
            { x: 4, y: 3 } ],
            solutionPath));

var inputString = '3,3,2,2,3,3,5,20,4,1,2,8,1,1,3';
var solutionPath = main.solveMatrix(inputString);
console.log(true === _.isEqual([ 
            { x: 2, y: 2 },
            { x: 3, y: 2 },
            { x: 3, y: 3 }],
            solutionPath));

var inputString = '3,3,3,2,1,1,5,20,4,1,2,8,1,1,3';
var solutionPath = main.solveMatrix(inputString);
console.log(true === _.isEqual([ 
            { x: 3, y: 2 }, 
            { x: 3, y: 1 }, 
            { x: 2, y: 1 }, 
            { x: 1, y: 1 }],
            solutionPath));
var inputString = '3,4,1,3,3,4,1,1,1,20,1,20,20,20,1,1,1,1';
var solutionPath = main.solveMatrix(inputString);
console.log(true === _.isEqual([ 
            { x: 1, y: 3 },
            { x: 1, y: 2 },
            { x: 1, y: 1 },
            { x: 2, y: 1 },
            { x: 3, y: 1 },
            { x: 3, y: 2 },
            { x: 3, y: 3 },
            { x: 3, y: 4 }],
            solutionPath));
var inputString = '3,4,1,3,3,4,1,1,1,20,20,20,20,20,1,1,1,1';
var solutionPath = main.solveMatrix(inputString);
console.log(true === _.isEqual([ 
            { x: 1, y: 3 }, 
            { x: 2, y: 3 }, 
            { x: 3, y: 3 }, 
            { x: 3, y: 4 }],
            solutionPath));


