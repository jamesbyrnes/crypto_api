"use strict";

const ip = require('ip');
const app = require('express')();
const bodyParser = require('body-parser');
const routes = require('./routes/');
const port = process.env.PORT || 3030;

app.use(bodyParser.json());
app.use('/api/v1', routes);

app.listen(port);

console.log('Cryptogrammer API server started on ' + ip.address() + ':' + port);