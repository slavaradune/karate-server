var express = require('express');
var router = express.Router();
let db = require('../db/db');

router.get('/', function(req, res, next) {
    let id = req.query.id;
    res.send({result: db.getPayments(id)});
});

router.post('/', function(req, res, next) {
    let body = req.body;
    db.setPayment(body.id, body.key, body.value);
    res.send({isOk: true});
});

module.exports = router;
