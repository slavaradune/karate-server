var express = require('express');
var router = express.Router();
let db = require('../db/db');

router.get('/', function(req, res, next) {
    let id = req.query.id;
    res.send({result: db.getMember(id)});
});

router.post('/', function(req, res, next) {
    let body = req.body;
    db.addMember(body, function (result) {
        res.send(result);
    });
});

module.exports = router;
