var express = require('express');
let db = require('../db/db');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.send({results: db.getMembers()});
});

module.exports = router;
