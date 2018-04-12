"use strict";
const alphaUtil = require('../utils/alpha');
const strUtil = require('../utils/string');
const hintUtil = require('../utils/hints');

module.exports.Puzzle = class Puzzle {
  constructor(phrase, id) {
    this.phrase = phrase;
    this.id = id;
    this.puzzlePhrase = '';
    this.alphaSet = {};
    this.hints = {};
  }

  init(useRotate, numHints) {
    this.alphaSet = useRotate ? alphaUtil.getRotatedAlphabetSet() : alphaUtil.getShuffledAlphabetSet();
    numHints = numHints;
    this.puzzlePhrase = strUtil.puzzlefyPhrase(this.phrase, this.alphaSet);
    this.hints = hintUtil.getHints(this.puzzlePhrase, this.alphaSet, numHints);
  }

  toJSON() {
    return {
      "id": this.id,
      "puzzle": this.puzzlePhrase,
      "hints": this.hints
    };
  }
};