"use strict";

const { getAll, getById, getRandom } = require('../models/quotes');

module.exports.getAllQuotes = (req, res, next) => {
  getAll()
  .then((quotes) => {
    res.status(200).json(quotes);
  })
  .catch((err) => {
    next(err);
  });
};

module.exports.getRandomQuote = (req, res, next) => {
  getRandom()
  .then((quotes) => {
    res.status(200).json(quotes);
  })
  .catch((err) => {
    next(err);
  });
};

module.exports.getQuoteById = (req, res, next) => {
  getById(req.params.id)
  .then((quote) => {
    if (quote) {
      res.status(200).json(quote);
    } else {
      res.status(400).json({
        "status_code": 400,
        "message": "Bad request"
      });
    }
  })
  .catch((err) => {
    next(err);
  });
};
