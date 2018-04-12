"use strict";

const { Puzzle } = require('../models/puzzles');
const { getRandom, getById } = require('../models/quotes');
const { normalizePhrase } = require('../utils/string');

module.exports.getPuzzle = (req, res, next) => {
  var numHints = parseInt(req.query.numHints) || 2;
  var useRotate = req.query.useRotate || 'false';

  // Check if numHints is numeric and useRotate is boolean;
  // Give out 400 if not the case
  if (!Number.isInteger(numHints) || (useRotate != 'true' && useRotate != 'false')) {
    res.status(400).json({
      "status_code": 400,
      "message": "Bad request"
    });
  }
  getRandom()
  .then((quote) => {
    var puzzle = new Puzzle(quote.quote, quote.quote_id);
    puzzle.init(useRotate, numHints);
    res.status(200).json(puzzle.toJSON());
  })
  .catch((err) => {
    next(err);
  });
};

module.exports.validatePuzzle = (req, res, next) => {
  var puzzleGuess = req.body.puzzle_guess;
  var puzzleId = req.body.puzzle_id;
  //TODO more robust error checking on request body
  if (!puzzleGuess || !puzzleId) {
    res.status(400).json({
      "response_code": 400,
      "message": "Bad request"
    });
  }
  getById(puzzleId)
  .then((quote) => {
    var normalizedQuote = normalizePhrase(quote.quote);
    var result = {};
    if (puzzleGuess == normalizedQuote) {
      result = {"puzzle_solved": true}    
    } else {
      result = {"puzzle_solved": false}
    }
    res.status(200).json(result);
  })
  .catch((err) => {
    next(err);
  });
};