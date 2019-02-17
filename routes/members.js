let express = require('express');
let db = require('../db/dbMembers');
let dbPayments = require('../db/dbPayments');
let router = express.Router();

router.get('/', function(req, res, next) {
    let id = req.query.id;
    let paid = req.query.paid;
    if (id) {
        db.getMember(id, function (result) {
            res.send({result: result});
        });
    } else if (paid !== undefined) {
        db.getMembers(function (result) {
            res.send({results: dbPayments.filterPaid(result, paid)});
        });
    } else {
        db.getMembers(function (result) {
            res.send({results: result});
        });

    }
});

router.put('/', function(req, res, next) {
    let body = req.body;
    db.addMember(body, function (result) {
        res.send(result);
    });
});

router.post('/', function(req, res, next) {
    let body = req.body;
    db.changeMember(body, function (result) {
        res.send(result);
    });
});

module.exports = router;
