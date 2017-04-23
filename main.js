'use strict'

const PriorityQueue = require('fastpriorityqueue');
const _ = require('underscore');

/**
 * 
 * @param {*} inputString 
 */
function parseInputData(inputString) {
  var inputArray = inputString.split(',');
  var matrixDimension = {
    m: parseInt(inputArray[0]),
    n: parseInt(inputArray[1])

  };

  var startingPoint = {
    x: parseInt(inputArray[2]) - 1,
    y: parseInt(inputArray[3]) - 1
  };

  var endingPoint = {
    x: parseInt(inputArray[4]) - 1,
    y: parseInt(inputArray[5]) - 1
  };

  var matrixValues = [];
  for (let i = 6; i < inputArray.length; i++) {
    matrixValues.push(parseInt(inputArray[i]));
  }
  return {
    matrixValues: matrixValues,
    matrixDimension: matrixDimension,
    startingPoint: startingPoint,
    endingPoint: endingPoint
  }
}

function solveMatrix(inputStringParam) {
  // teszteles celjabol lehet kozvetlenul valamilyen stringgel hivni
  // var matrixData = parseInputData('4,3,1,1,4,3,10,12,3,0,45,3,4,5,6,6,5,45');
  var inputString =  process.argv[2] || inputStringParam;
  var matrixData = parseInputData(inputString);
  const generatedMatrix = generateMatrix(matrixData.matrixValues, matrixData.matrixDimension);
  var solutionPath = getSolutionPath(generatedMatrix, matrixData.startingPoint, matrixData.endingPoint);
  //a 0-tol indexelest megszuntetem
  _.each(solutionPath, function(index) {
    index.x += 1;
    index.y += 1;
  })
  console.log(solutionPath);
  return solutionPath;
}

function getSolutionPath(generatedMatrix, startingPoint, endingPoint) {

  function pathPriorityComparator(pathA, pathB) {
    return pathA.weight < pathB.weight;
  }
  // a priorityQueue-ban a path-nak a sulya szerint akarom rendezni, mindig a legkisebb sulyu keruljon elore
  var matrixPriorityQueue = new PriorityQueue(pathPriorityComparator);

  matrixPriorityQueue.add({
    weight: generatedMatrix[startingPoint.x][startingPoint.y],
    indexList: [startingPoint]
  });

  while (true) {
    let currentlyShortestPath = matrixPriorityQueue.poll();

    if(_.isEqual(currentlyShortestPath.indexList[currentlyShortestPath.indexList.length - 1], endingPoint)) {
      return currentlyShortestPath.indexList;
    } else {
      let possiblePaths = generatePossiblePaths(currentlyShortestPath, generatedMatrix);
      _.each(possiblePaths, function(possiblePath) {
        matrixPriorityQueue.add(possiblePath);
      })
    }
  }
}

function generatePossiblePaths(currentlyShortestPath, generatedMatrix) {
  var lastIndex = currentlyShortestPath.indexList[currentlyShortestPath.indexList.length - 1];
  var visitedIndices = currentlyShortestPath.indexList;
  var possiblePaths = [];
  var validNeighborsOfLastIndex = getValidNeighbors(lastIndex, visitedIndices, generatedMatrix);
  _.each(validNeighborsOfLastIndex, function(validNeighbor) {
    let newIndexList = currentlyShortestPath.indexList.slice();
    newIndexList.push(validNeighbor);
    possiblePaths.push({
      weight: currentlyShortestPath.weight + generatedMatrix[validNeighbor.x][validNeighbor.y],
      indexList: newIndexList
    });
  })
  return possiblePaths;
}

function getValidNeighbors(index, visitedIndices, generatedMatrix) {
  var possibleIndices = [];
  var validIndices = [];
  if(index.x - 1 >= 0) {
    possibleIndices.push({
      x:  index.x - 1,
      y: index.y
    })
  }
  if(index.y - 1 >= 0) {
    possibleIndices.push({
      x:  index.x,
      y: index.y - 1
    })
  }

  if(index.x + 1 <= generatedMatrix.m - 1) {
    possibleIndices.push({
      x:  index.x + 1,
      y: index.y
    })
  }
  if(index.y + 1 <= generatedMatrix.n - 1) {
    possibleIndices.push({
      x:  index.x,
      y: index.y + 1
    })
  }
  _.each(possibleIndices, function(possibleIndex) {
    // lenyegeben csak azt tesztelem, h ne adjak hozza olyan indexet, amit a path-on mar rajta van
    if (_.where(visitedIndices, possibleIndex).length === 0) {
      validIndices.push(possibleIndex);
    }
  })
  return validIndices;
}

function generateMatrix(matrixValues, matrixDimension) {
  if(matrixValues.length !== (matrixDimension.n * matrixDimension.m)) {
    throw "invalid matrix";
  }

  // eleg korulmenyes JS-ben egy nested listat letrehozni...
  var generatedMatrix = new Array(matrixDimension.m);
  var matrixValuesIndex = 0;
  for (let i = 0; i < matrixDimension.m; i++) {
    generatedMatrix[i] = new Array(matrixDimension.n);
    for (let j = 0; j < matrixDimension.n; j++) {
      generatedMatrix[i][j] = matrixValues[matrixValuesIndex];
      matrixValuesIndex++;
    }
  }

  // valszeg ez sem best practice, h egy listanak propertyket setelek
  generatedMatrix.m = matrixDimension.m;
  generatedMatrix.n = matrixDimension.n;
  return generatedMatrix;
}

// ha a tobbi helper metodust tesztelni szeretnem, gondolom azokat is exportalni kene
module.exports = {
  solveMatrix: solveMatrix
}
// nem tudom, h ezt igy kellene-e kulturaltan csinalni, hogy a vegen meghivjuk az adott metodust
//de a node parancsra igy legalabb az fut, amit szeretnek
solveMatrix();