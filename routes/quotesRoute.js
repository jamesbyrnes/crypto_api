"use strict";

const { Router } = require('express');
const quoteRouter = Router();
const { getAllQuotes, getQuoteById, getRandomQuote } = require('../controllers/quotesCont');

quoteRouter.get('/quotes/', getAllQuotes);
quoteRouter.get('/quotes/random', getRandomQuote);
quoteRouter.get('/quotes/:id', getQuoteById);

module.exports = quoteRouter;
