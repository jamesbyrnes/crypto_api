"use strict";
const alphaUtil = require('./alpha');

module.exports.normalizePhrase = (phrase) => {
  // Strip special characters from a string and convert to all upper case.
  return phrase.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase();
}

module.exports.puzzlefyPhrase = (phrase, alphaSet) => {
  return this.normalizePhrase(phrase).split('').map((val) => {
    if (val.charCodeAt() >= 65 && val.charCodeAt() <= 90) {
      return alphaSet[val];
    }
    return val;
  }).join('');
}