// routes/server.js
var express = require('express');
var router = express.Router();

var serverController = require('../controllers/server');

router.get('/status', serverController.status);

module.exports = router;