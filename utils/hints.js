"use strict";

var getHistogram = (puzzlePhrase) => {
  // Short and sweet way to get the char frequency for
  // any string.
  var hist = puzzlePhrase.split('').reduce((acc, curr) => {
    if (acc[curr]) {
      acc[curr]++;
    } else {
      acc[curr] = 0;
    }
    return acc;
  }, {});

  return hist;
};

var stripNonAlpha = (puzzlePhrase) => {
  // We'll need a histogram of just the letters, so we need to regex
  // the non-cap letters out (presumably we've already sanitized the 
  // input at this stage)
  return puzzlePhrase.replace(/[^A-Z]/g, '');
};

module.exports.getHints = (puzzlePhrase, alphaSet, numHints) => {
  var res = {};
  if (numHints <= 0) return res;

  var hist = getHistogram(stripNonAlpha(puzzlePhrase));
  var uniqueLetters = Object.keys(hist);
  var alphabet = Object.keys(alphaSet);

  if (numHints > uniqueLetters.length) {
    numHints = uniqueLetters;
  }

  for (var i = 0; i < alphabet.length; i++) {
    if (Object.keys(res).length == numHints) break;
    var currPuzzleLetter = alphaSet[alphabet[i]];

    // Check the shuffled counterpart to the regular alphabet,
    // see if it's actually in the puzzle. If it is, add it to the 
    // hint list.
    if (uniqueLetters.indexOf(currPuzzleLetter) >= 0) {
      res[currPuzzleLetter] = alphabet[i];
    }
  }

  return res;
};