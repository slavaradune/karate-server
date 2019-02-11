var express = require('express');
let db = require('../db/db');
var router = express.Router();


router.get('/', function(req, res, next) {
    db.getMembers(function (result) {
        res.send({results: result});
    });
});

module.exports = router;
