let express = require('express');
let router = express.Router();
let db = require('../db/dbPayments');

router.get('/', function(req, res, next) {
    let id = req.query.id;
    db.getPayments(id, function (result) {
        res.send({result: result});
    });
});

router.post('/', function(req, res, next) {
    let body = req.body;
    db.setPayment(body.id, body.key, body.value, function (result) {
        res.send(result);
    });
});

module.exports = router;
