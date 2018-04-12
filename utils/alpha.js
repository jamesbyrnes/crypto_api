"use strict";

module.exports.getUppercaseAlphabet = ()  => {
  return [...Array(26)].map((val, i) => String.fromCharCode(i + 65));
};

module.exports.getShuffledAlphabetSet = () => {
  var alphaShuf = this.getUppercaseAlphabet();
  for (var i = 0; i < alphaShuf.length; i++) {
    var rando = Math.floor(Math.random() * alphaShuf.length);
    var temp = alphaShuf[i];
    alphaShuf[i] = alphaShuf[rando];
    alphaShuf[rando] = temp;
  }
  var res = {};
  this.getUppercaseAlphabet().forEach((val, i) => {
    res[val] = alphaShuf[i];
  });
  return res;
};

module.exports.getRotatedAlphabetSet = () => {
  // a.k.a. Caesar cipher
  // Makes for a very easy game once you've figured one letter out :)
  var alpha = this.getUppercaseAlphabet();
  var rotationFactor = Math.floor(Math.random() * alpha.length - 1);
  var res = {};
  alpha.forEach((val, i) => {
    var newIndex = (i + rotationFactor) % alpha.length;
    res[val] = alpha[newIndex];
  });
  return res;
};