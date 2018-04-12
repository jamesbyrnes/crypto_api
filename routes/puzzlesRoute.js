"use strict";

const { Router } = require('express');
const quoteRouter = Router();
const { getPuzzle, validatePuzzle } = require('../controllers/puzzlesCont');

quoteRouter.post('/puzzle/validate', validatePuzzle);
quoteRouter.get('/puzzle/', getPuzzle);

module.exports = quoteRouter;