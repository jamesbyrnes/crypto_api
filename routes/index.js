"use strict";

const { Router } = require('express');
const router = Router();

router.use(require('./quotesRoute'));
router.use(require('./puzzlesRoute'));

module.exports = router;
